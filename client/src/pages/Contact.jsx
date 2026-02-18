import React, { useState } from 'react';
import api from '../services/api';
import './Contact.css';
import { FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import ComputerModel from '../components/3d/ComputerModel';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState(null); // null, 'success', 'error'
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const res = await api.post('/contact', formData);
            if (res.data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            }
        } catch (err) {
            setStatus('error');
            setErrorMsg(err.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <div className="contact-page-container">
            <div className="container">
                <div className="section-header">
                    <h1 className="pixel-text">Contact Us</h1>
                    <p>Get in touch with us for your next project</p>
                </div>

                <div className="contact-wrapper">
                    <div className="contact-info">
                        <h2 className="pixel-text">Let's Talk</h2>
                        <p>Fill out the form and our team will get back to you within 24 hours.</p>

                        <div className="info-section">
                            <h3>Official Email</h3>
                            <div className="info-item">
                                <FaEnvelope className="info-icon" />
                                <span>webknoxsystemdesigns@gmail.com</span>
                            </div>
                        </div>

                        <div className="info-section">
                            <h3>WhatsApp Support</h3>
                            <div className="info-item">
                                <FaWhatsapp className="info-icon" />
                                <span>+91 6207804441</span>
                            </div>
                        </div>

                        {/* 3D Computer Model */}
                        <div className="contact-3d-model">
                            <ComputerModel />
                        </div>
                    </div>

                    <div className="contact-form-card">
                        <form onSubmit={handleSubmit}>
                            {status === 'success' && (
                                <div className="alert success">Message sent successfully!</div>
                            )}
                            {status === 'error' && (
                                <div className="alert error">{errorMsg}</div>
                            )}

                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Full Name</label>
                                <span className="field-instruction">Enter your name or business name</span>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="e.g. John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <span className="field-instruction">We will use this to reach back to you</span>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message" className="form-label">Message</label>
                                <span className="field-instruction">Tell us about your project or inquiry</span>
                                <textarea
                                    name="message"
                                    className="form-control"
                                    rows="5"
                                    placeholder="Write your message here..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-full"
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
