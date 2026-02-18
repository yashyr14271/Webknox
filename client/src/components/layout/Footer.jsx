import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-links container">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>About Us</h2>
                        <a href="/about">How it works</a>
                        <a href="/testimonials">Testimonials</a>
                        <a href="/careers">Careers</a>
                        <a href="/terms">Terms of Service</a>
                    </div>
                </div>
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>Services</h2>
                        <a href="/services">Full Stack</a>
                        <a href="/services">Frontend</a>
                        <a href="/services">Backend</a>
                        <a href="/services">Design</a>
                    </div>
                </div>
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>Contact Us</h2>
                        <a href="/contact">Contact</a>
                        <a href="/contact">Support</a>
                        <a href="/contact">Destinations</a>
                        <a href="/contact">Sponsorships</a>
                    </div>
                </div>
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>Social Media</h2>
                        <a href="/">Instagram</a>
                        <a href="/">Facebook</a>
                        <a href="/">Youtube</a>
                        <a href="/">Twitter</a>
                    </div>
                </div>
            </div>
            <section className="social-media">
                <div className="social-media-wrap container">
                    <div className="footer-logo">
                        <a href="/" className="social-logo">
                            WEBKNOX
                        </a>
                    </div>
                    <small className="website-rights">WEBKNOX © 2026</small>
                    <div className="social-icons">
                        <a href="/" className="social-icon-link facebook" target="_blank" aria-label="Facebook">
                            <FaFacebook />
                        </a>
                        <a href="https://www.instagram.com/yash_rajput.8797/" className="social-icon-link instagram" target="_blank" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href="/" className="social-icon-link youtube" target="_blank" aria-label="Youtube">
                            <FaLinkedin />
                        </a>
                        <a href="/" className="social-icon-link twitter" target="_blank" aria-label="Twitter">
                            <FaTwitter />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Footer;
