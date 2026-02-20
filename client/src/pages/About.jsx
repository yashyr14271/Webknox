import React from 'react';
import './About.css';
import TeamShowcase from '../components/3d/TeamShowcase';

const About = () => {
    const team = [
        {
            name: 'Abhay Pratap Singh',
            role: 'Founder, Full Stack & Design',
            color: '#FF0000',
            pos: [-4, 0, 0],
            portfolio: '#',
            instagram: 'https://www.instagram.com/_abhay00__/'
        },
        {
            name: 'Yash',
            role: 'Co-founder, Frontend & Design',
            color: '#FFFFFF',
            pos: [0, 0, 0],
            portfolio: '#',
            instagram: 'https://instagram.com/yash_rajput.8797'
        },
        {
            name: 'Ashutosh Bansal',
            role: 'Database Manager',
            color: '#FF0000',
            pos: [4, 0, 0],
            portfolio: '#',
            instagram: 'https://www.instagram.com/ashutosh_bansal.rar/'
        }
    ];

    return (
        <div className="about-container">
            <div className="container">
                <div className="about-header section-header">
                    <h1 className="pixel-text">Our Team</h1>
                    <p>We are a team of passionate developers & designers.</p>
                </div>

                <section className="team-section section">
                    <h2 className="pixel-text text-center mb-0">Meet The Team</h2>
                    <TeamShowcase team={team} />

                    <div className="team-info-grid">
                        {team.map((member, i) => (
                            <div key={i} className="member-info-card">
                                <h3 className="member-name">{member.name}</h3>
                                <p className="member-role">{member.role}</p>
                                <div className="member-links">
                                    <a href={member.portfolio} className="member-link" target="_blank" rel="noopener noreferrer">
                                        Portfolio
                                    </a>
                                    <a href={member.instagram} className="member-link" target="_blank" rel="noopener noreferrer">
                                        Instagram
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
