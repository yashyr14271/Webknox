const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        console.log('Received contact form submission:', { name, email });

        let contact;
        try {
            contact = await Contact.create({
                name,
                email,
                phone,
                message
            });
            console.log('Contact saved to database.');
        } catch (dbErr) {
            console.error('Database Error:', dbErr.message);
            // We continue to try sending email even if DB fails for now
        }

        // Send Email Notification
        console.log('Attempting to send email...');
        console.log('EMAIL_USER exists:', !!process.env.EMAIL_USER);
        console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.CONTACT_EMAIL || 'webknoxsystemdesigns@gmail.com',
            subject: `New Contact Form Submission from ${name}`,
            text: `
                You have a new contact form submission:
                
                Name: ${name}
                Email: ${email}
                Phone: ${phone || 'N/A'}
                Message: ${message}
            `,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('✅ Email sent successfully to:', mailOptions.to);
        } catch (mailErr) {
            console.error('❌ Nodemailer Error:', mailErr.message);
            console.error('Full Mail Error:', mailErr);
            throw new Error(`Email could not be sent. Check if EMAIL_USER and EMAIL_PASS are correct. Error: ${mailErr.message}`);
        }

        res.status(201).json({
            success: true,
            message: 'Inquiry submitted and email sent!',
            data: contact
        });
    } catch (err) {
        console.error('❌ General Error in submitContact:', err.message);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Private (Admin only - ideally)
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};
