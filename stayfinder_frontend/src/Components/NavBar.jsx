import React, { useEffect, useState } from 'react';
import './NavBar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/hotel.png';

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isHost, setIsHost] = useState(false);

    useEffect(() => {
        const username = localStorage.getItem('username');
        const userRole = localStorage.getItem('userRole'); // or isHost flag
        setIsLoggedIn(!!username);
        setIsHost(userRole === 'host');
    }, []);

    // Check if current path is login or signup
    const SignOrLogin = location.pathname === "/SignupPage" || location.pathname === "/LoginPage";

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('userRole');
        setIsLoggedIn(false);
        setIsHost(false);
        navigate('/');
    };

    return (
        <header className="navbar sticky-navigation">
            <button className="logo-border" onClick={() => navigate('/')}>
                <div className="hover-circle">
                    <img src={logo} alt="Logo" className="Logo-image" />
                </div>
            </button>
            <div className="logo1">STAY FINDER</div>

            <nav>
                <ul className="navbar-list">
                    {/* Home button always visible */}
                    <li>
                        <a
                            className={isActive('/') ? 'active' : ''}
                            onClick={() => navigate('/')}
                        >Home</a>
                    </li>

                    {/* Other items only visible if not on login/signup */}
                    {!SignOrLogin && (
                        <>
                            <li>
                                <a
                                    className={isActive('/AboutPage') ? 'active' : 'notactive'}
                                    onClick={() => navigate('/AboutPage')}
                                >About</a>
                            </li>
                            <li>
                                <a
                                    className={isActive('/OtherPages') ? 'active' : 'notactive'}
                                    onClick={() => navigate('/OtherPages')}
                                >Pages</a>
                            </li>
                            {isHost && (
                                <li>
                                    <a
                                        className={isActive('/HostDashboard') ? 'active' : 'notactive'}
                                        onClick={() => navigate('/HostDashboard')}
                                    >Host Dashboard</a>
                                </li>
                            )}
                        </>
                    )}

                    {/* Login and Signup or Logout */}
                    {!isLoggedIn ? (
                        <>
                            <li>
                                <a
                                    className={isActive('/LoginPage') ? 'active' : 'notactive'}
                                    onClick={() => navigate('/LoginPage')}
                                >Login</a>
                            </li>
                            <li>
                                <a
                                    className={isActive('/SignupPage') ? 'active' : 'notactive'}
                                    onClick={() => navigate('/SignupPage')}
                                >Signup</a>
                            </li>
                        </>
                    ) : (
                        <li>
                            <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        </li>
                    )}
                </ul>
            </nav>

            {/* Cart and Book button only visible if not on login/signup */}
        </header>
    );
};

export default NavBar;
