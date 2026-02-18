import React from 'react';
import './Preloader.css';

const Preloader = ({ loading }) => {
    return (
        <div className={`preloader-container ${!loading ? 'fade-out' : ''}`}>
            <div className="logo-wrapper">
                <svg
                    width="80"
                    height="80"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="wGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6a11cb" />
                            <stop offset="50%" stopColor="#fa2d48" />
                            <stop offset="100%" stopColor="#2575fc" />
                        </linearGradient>
                    </defs>
                    <path
                        className="w-logo-path"
                        d="M10 20 L30 80 L50 40 L70 80 L90 20"
                        stroke="url(#wGradient)"
                    />
                </svg>

                <div className="text-container">
                    WEBKNOX
                </div>
                <div className="dot"></div>
            </div>
        </div>
    );
};

export default Preloader;
