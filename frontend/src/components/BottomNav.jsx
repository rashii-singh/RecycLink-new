import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
    const location = useLocation();

    if (location.pathname === '/login') return null;

    const navItems = [
        { 
            path: '/', 
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            ), 
            label: 'Home' 
        },
        { 
            path: '/request-pickup', 
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 17h4V5H2v12h3m15 0h1v-3.34a2 2 0 0 0-.59-1.42L17.5 10H14"></path>
                    <circle cx="7.5" cy="17.5" r="2.5"></circle>
                    <circle cx="17.5" cy="17.5" r="2.5"></circle>
                </svg>
            ), 
            label: 'Pickup' 
        },
        { 
            path: '/sell', 
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <path d="M8 10a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2 2 2 0 0 1-2 2H10a2 2 0 0 0-2 2 2 2 0 0 0 2 2h4a2 2 0 0 0 2-2"></path>
                </svg>
            ), 
            label: 'Sell' 
        },
        { 
            path: '/profile', 
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            ), 
            label: 'Profile' 
        },
    ];

    return (
        <div className="bottom-nav mobile-only">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link 
                        key={item.path} 
                        to={item.path} 
                        className={`bottom-nav-item ${isActive ? 'active' : ''}`}
                    >
                        <span className="bottom-nav-icon">
                            {item.icon}
                        </span>
                        <span className="bottom-nav-label">{item.label}</span>
                    </Link>
                );
            })}
        </div>
    );
}
