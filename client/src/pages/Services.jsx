import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';

const Services = () => {
    const navigate = useNavigate();

    const services = [
        {
            title: "Full Stack Sites",
            desc: "End-to-end web solutions with powerful backends, real-time databases, and seamless API integrations for maximum scale.",
            tech: ["React", "Express", "Node.js", "MongoDB", "Redux"]
        },
        {
            title: "Frontend",
            desc: "Modern, pixel-perfect user interfaces with advanced animations and performance optimizations that deliver elite UX.",
            tech: ["Vite", "React", "Framer Motion", "Vanilla CSS", "Tailwind"]
        },
        {
            title: "3D Front End with 3D Model Integration",
            desc: "Cutting-edge 3D web experiences using Three.js and React Three Fiber to create immersive, interactive environments.",
            tech: ["Three.js", "R3F", "GLSL", "Drei", "Physics"]
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
            </div>
        </div>
    );
};

export default Services;
