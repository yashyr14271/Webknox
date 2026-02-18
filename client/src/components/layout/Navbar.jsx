import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa'; // Using FontAwesome icons
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();



    const handleClick = () => {
        console.log('Menu clicked');
        setClick(!click);
    };

    const closeMobileMenu = () => {
        console.log('Closing mobile menu');
        setClick(false);
    };

    const onLogout = async () => {
        await logout();
        closeMobileMenu();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container container">
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                    WEBKNOX
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    {click ? <FaTimes /> : <FaBars />}
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                            Our Team
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/services" className="nav-links" onClick={closeMobileMenu}>
                            Services
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-links" onClick={closeMobileMenu}>
                            Contact
                        </Link>
                    </li>

                    {/* Mobile Only Actions */}
                    <li className="nav-item mobile-only">
                        <div className="nav-links" onClick={() => { toggleTheme(); closeMobileMenu(); }}>
                            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                        </div>
                    </li>

                    {user ? (
                        <>
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-links" onClick={closeMobileMenu}>
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <div className="nav-links mobile-logout" onClick={onLogout}>
                                    Logout
                                </div>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item mobile-only">
                                <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item mobile-only">
                                <Link to="/signup" className="nav-links signup-mobile" onClick={closeMobileMenu}>
                                    Get Started
                                </Link>
                            </li>
                        </>
                    )}
                </ul>

                <div className="nav-actions">
                    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </button>

                    {user ? (
                        <div className="nav-auth-desktop">
                            <span className="welcome-text">Hi, {user.name.split(' ')[0]}</span>
                            <button className="btn-logout" onClick={onLogout}>Logout</button>
                        </div>
                    ) : (
                        <div className="nav-auth-desktop">
                            <Link to="/login" className="btn btn-login">Login</Link>
                            <Link to="/signup" className="btn btn-signup">Get Started</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
