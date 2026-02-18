import React from 'react';
import './AuroraBackground.css';

const AuroraBackground = () => {
    return (
        <div className="aurora-container">
            <div className="aurora-blob aurora-1"></div>
            <div className="aurora-blob aurora-2"></div>
            <div className="aurora-blob aurora-3"></div>
            <div className="aurora-overlay"></div>
        </div>
    );
};

export default AuroraBackground;
