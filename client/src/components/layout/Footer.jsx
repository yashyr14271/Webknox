import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="footer-container">

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
