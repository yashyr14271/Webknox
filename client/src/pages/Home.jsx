import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { FaLaptopCode, FaServer, FaMobileAlt, FaRocket } from 'react-icons/fa';
import AuroraBackground from '../components/animations/AuroraBackground';

const Home = () => {
    const [colorIndex, setColorIndex] = useState(0);
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FFA500', '#0000FF']; // Red, Green, Blue, Yellow, Orange, Blue

    const leftEyeRef = useRef(null);
    const rightEyeRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const moveEyes = (eyeRef) => {
                if (!eyeRef.current) return;
                const eye = eyeRef.current;
                const pupil = eye.querySelector('.pupil');
                const area = eye.getBoundingClientRect();

                const eyeCenterX = area.left + area.width / 2;
                const eyeCenterY = area.top + area.height / 2;

                const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
                const distance = Math.min(area.width / 4, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 10);

                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                pupil.style.transform = `translate(${x}px, ${y}px)`;
            };

            moveEyes(leftEyeRef);
            moveEyes(rightEyeRef);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleEyeHover = () => {
        const nextIndex = (colorIndex + 1) % colors.length;
        setColorIndex(nextIndex);
        const newColor = colors[nextIndex];

        // Helper to lighten/darken or just use newColor for now
        document.documentElement.style.setProperty('--primary-color', newColor);
        document.documentElement.style.setProperty('--primary-light', newColor);
        document.documentElement.style.setProperty('--accent-color', newColor);
        document.documentElement.style.setProperty('--accent-teal', newColor);

        // Update box shadows to match the new primary color
        document.documentElement.style.setProperty('--shadow-sm', `0 2px 8px ${newColor}22`);
        document.documentElement.style.setProperty('--shadow-md', `0 4px 12px ${newColor}33`);
        document.documentElement.style.setProperty('--shadow-lg', `0 8px 24px ${newColor}44`);
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <AuroraBackground />
                <div className="container hero-layout">
                    <div className="hero-content fade-in">
                        <h1 className="hero-heading">We Build Powerful <br /> Web Experiences</h1>
                        <p className="hero-subtext">
                            Full Stack Development Services for Startups & Businesses.
                            Scalable, secure, and stunning web solutions.
                        </p>
                        <div className="hero-btns">
                            <Link to="/signup" className="btn btn-primary btn-lg">Get Started</Link>
                            <Link to="/contact" className="btn btn-outline btn-lg">Contact Us</Link>
                        </div>
                    </div>

                    <div className="hero-interactive fade-in" style={{ animationDelay: '0.3s' }}>
                        <div className="eye-container" onMouseEnter={handleEyeHover}>
                            <div className="eye" ref={leftEyeRef}>
                                <div className="pupil"></div>
                            </div>
                            <div className="eye" ref={rightEyeRef}>
                                <div className="pupil"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Preview */}
            <section className="services-preview section">
                <div className="container">
                    <div className="section-header">
                        <h2>Our Expertise</h2>
                        <p>End-to-end development solutions for your business</p>
                    </div>
                    <div className="services-grid">
                        <div className="service-card">
                            <div className="icon-wrapper"><FaLaptopCode /></div>
                            <h3>Frontend Development</h3>
                            <p>Interactive and responsive UIs using React and modern CSS.</p>
                        </div>
                        <div className="service-card">
                            <div className="icon-wrapper"><FaServer /></div>
                            <h3>Backend Systems</h3>
                            <p>Robust APIs and database architecture with Node.js & MongoDB.</p>
                        </div>
                        <div className="service-card">
                            <div className="icon-wrapper"><FaMobileAlt /></div>
                            <h3>Responsive Design</h3>
                            <p>Flawless experiences across mobile, tablet, and desktop devices.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us - Parallax Stack */}
            <section className="why-us-stack bg-light">
                <div className="container">
                    <h2 className="pixel-text section-title-stack">Why Choose Webknox?</h2>
                    <div className="stack-wrapper">
                        <div className="stack-card card-1">
                            <div className="card-content">
                                <h3>🚀 We Don’t Just Build Websites. We Build Digital Assets.</h3>
                                <p>At Webknox, your website isn’t just a design — it’s a growth engine. Every layout, animation, and line of code is built to convert visitors into customers.</p>
                            </div>
                        </div>
                        <div className="stack-card card-2">
                            <div className="card-content">
                                <h3>💎 Clean, Modern & Premium UI</h3>
                                <p>We craft sleek, high-performance interfaces using the latest technologies like React.js and Next.js — ensuring your brand looks sharp, trustworthy, and future-ready.</p>
                            </div>
                        </div>
                        <div className="stack-card card-3">
                            <div className="card-content">
                                <h3>⚡ Performance First Approach</h3>
                                <p>Slow websites lose money. We optimize every project for lightning-fast speed, SEO structure, and smooth user experience across all devices.</p>
                            </div>
                        </div>
                        <div className="stack-card card-4">
                            <div className="card-content">
                                <h3>🎯 Strategy Before Design</h3>
                                <p>We don’t start with colors. We start with understanding your business goals, target audience, and conversion journey — then we design with purpose.</p>
                            </div>
                        </div>
                        <div className="stack-card card-5">
                            <div className="card-content">
                                <h3>🤝 Long-Term Partnership</h3>
                                <p>We don’t disappear after launch. Webknox provides continuous support, updates, and improvements — because your growth is our mission.</p>
                                <Link to="/about" className="btn btn-outline mt-3">Learn More About Our Mission</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
