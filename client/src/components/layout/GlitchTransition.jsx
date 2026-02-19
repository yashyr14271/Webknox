import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import LetterGlitch from '../animations/LetterGlitch';
import './GlitchTransition.css';

const GlitchTransition = ({ children }) => {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransitionStage] = useState('idle'); // idle, glitching, finished
    const prevLocation = useRef(location.pathname);

    useEffect(() => {
        if (location.pathname !== prevLocation.current) {
            // Trigger transition
            setTransitionStage('glitching');

            // Wait for glitch to cover screen
            const timer = setTimeout(() => {
                setDisplayLocation(location);
                setTransitionStage('finishing');
                prevLocation.current = location.pathname;
            }, 600); // Duration of glitch covering the screen

            return () => clearTimeout(timer);
        }
    }, [location]);

    useEffect(() => {
        if (transitionStage === 'finishing') {
            const timer = setTimeout(() => {
                setTransitionStage('idle');
            }, 600); // Duration for glitch to fade out
            return () => clearTimeout(timer);
        }
    }, [transitionStage]);

    return (
        <div className="transition-wrapper">
            <div className={`transition-content ${transitionStage !== 'idle' ? 'blur' : ''}`}>
                {React.cloneElement(children, { location: displayLocation })}
            </div>

            {transitionStage !== 'idle' && (
                <div className={`glitch-overlay ${transitionStage === 'finishing' ? 'fade-out' : 'fade-in'}`}>
                    <LetterGlitch
                        glitchColors={['#FF0000', '#00FF00', '#0000FF']}
                        glitchSpeed={30}
                        centerVignette={true}
                    />
                </div>
            )}
        </div>
    );
};

export default GlitchTransition;
