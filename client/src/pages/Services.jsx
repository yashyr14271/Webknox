import React from 'react';
import './Services.css';

const Services = () => {
    const services = [
        {
            title: "Full Stack Web Apps",
            desc: "Complete web applications built with React, Node.js, and MongoDB.",
            tech: ["React", "Node.js", "Express", "MongoDB"]
        },
        {
            title: "E-Commerce Solutions",
            desc: "Scalable online stores with secure payment integration.",
            tech: ["Next.js", "Stripe", "PostgreSQL"]
        },
        {
            title: "UI/UX Design",
            desc: "Beautiful, pixel-perfect designs that users love.",
            tech: ["Figma", "Adobe XD", "Prototyping"]
        },
        {
            title: "API Development",
            desc: "Robust RESTful and GraphQL APIs for your applications.",
            tech: ["Node.js", "Python", "GraphQL"]
        }
    ];

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
                            <p className="desc">{service.desc}</p>
                            <div className="tech-stack">
                                {service.tech.map((tech, i) => (
                                    <span key={i} className="tech-badge">{tech}</span>
                                ))}
                            </div>
                            <button className="btn btn-primary btn-full">Inquire Now</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
