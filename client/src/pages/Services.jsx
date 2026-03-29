import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';

const Services = () => {
    const navigate = useNavigate();

    const services = [
        {
            title: "Starter Landing Page",
            price: "$300",
            desc: "1-Page High-Converting Website, Mobile-Optimized & SEO-Ready, Clear CTA & Booking Integration.",
            tech: ["Mobile-Optimized", "SEO-Ready", "Booking Integration"]
        },
        {
            title: "Advanced - Multiple Page Site",
            price: "$700",
            desc: "5-Page Custom Website (Home, About, Services, Portfolio, Contact) Advanced SEO Setup & Blog Integration, Conversion-Optimized.",
            tech: ["5 Pages", "Advanced SEO", "Blog Integration"]
        },
        {
            title: "Premium - Fully Custom Tailored E-Commerce Sites",
            price: "$3,000",
            desc: "Fully Custom-Tailored Design, E-commerce, CRM, or Advanced Funnel Setup, SEO, Analytics, and A/B Testing.",
            tech: ["E-commerce", "CRM / Funnels", "A/B Testing"]
        }
    ];

    const addOns = [
        {
            title: "Integrated 3D Animated Web Designs",
            price: "$100",
            desc: "Engaging interactive 3D elements integrated directly into your web experience."
        },
        {
            title: "Branding Package",
            price: "$500",
            desc: "Professional Logo Design, Custom Color Palette, and comprehensive Brand Guidelines."
        },
        {
            title: "Google My Business Setup for Local SEO",
            price: "$200",
            desc: "Complete profile setup and optimization to boost local search visibility and discoverability."
        }
    ];

    const handleInquiry = (serviceTitle) => {
        const message = `I am interested in ${serviceTitle}. Please provide more details.`;
        navigate(`/contact?service=${encodeURIComponent(serviceTitle)}&message=${encodeURIComponent(message)}`);
    };

    return (
        <div className="services-page-container">
            <div className="container">
                <div className="section-header">
                    <h1>Our Services</h1>
                    <p>Professional solutions tailored to your business needs</p>
                </div>

                <div className="services-list-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-offer-card">
                            <h2>{service.title}</h2>
                            <div className="price">{service.price}</div>
                            <p className="desc">{service.desc}</p>
                            <div className="tech-stack">
                                {service.tech.map((tech, i) => (
                                    <span key={i} className="tech-badge">{tech}</span>
                                ))}
                            </div>
                            <button
                                className="btn btn-primary btn-full"
                                onClick={() => handleInquiry(service.title)}
                            >
                                Inquire Now
                            </button>
                        </div>
                    ))}
                </div>

                <div className="section-header" style={{ marginTop: '80px' }}>
                    <h2>Valuable Add-Ons</h2>
                    <p>Enhance your chosen package with these powerful upgrades</p>
                </div>

                <div className="services-list-grid">
                    {addOns.map((addon, index) => (
                        <div key={index} className="service-offer-card" style={{ padding: '30px' }}>
                            <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px', fontSize: '1.2rem' }}>{addon.title}</h3>
                            <div className="price" style={{ fontSize: '1.2rem' }}>{addon.price}</div>
                            <p className="desc">{addon.desc}</p>
                            <button
                                className="btn btn-primary btn-full"
                                onClick={() => handleInquiry(addon.title)}
                                style={{ marginTop: 'auto', background: 'transparent', border: '2px solid var(--primary-color)', color: 'var(--primary-color)' }}
                                onMouseOver={(e) => { e.currentTarget.style.background = 'var(--primary-color)'; e.currentTarget.style.color = '#fff'; }}
                                onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--primary-color)'; }}
                            >
                                Add to Package
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
