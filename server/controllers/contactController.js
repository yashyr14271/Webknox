const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const contact = await Contact.create({
            name,
            email,
            phone,
            message
        });

        // Send Email Notification
        const transporter = nodemailer.createTransport({
            service: 'gmail',
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

        await transporter.sendMail(mailOptions);

        res.status(201).json({
            success: true,
            data: contact
        });
    } catch (err) {
        console.error('Error in submitContact:', err);
        res.status(400).json({
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
