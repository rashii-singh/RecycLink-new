import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ isOpen, onClose }) {
    const location = useLocation();

    // Close mobile sidebar on route change
    useEffect(() => {
        if (isOpen && onClose) {
            onClose();
        }
    }, [location.pathname]);

    if (location.pathname === '/login') return null;

    const { currentUser } = useAuth();

    const allNavItems = [
        { 
            path: '/', 
            label: 'Home',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        },
        { 
            path: '/detect', 
            label: 'AI Detection',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        },
        { 
            path: '/collector-dashboard', 
            label: 'Collector Hub',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
        },
        { 
            path: '/eco-rider-dashboard', 
            label: 'Eco Rider Hub',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
        },
        { 
            path: '/dashboard', 
            label: 'My Dashboard',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
        },
        { 
            path: '/request-pickup', 
            label: 'Request Pickup',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H2v12h3m15 0h1v-3.34a2 2 0 0 0-.59-1.42L17.5 10H14"></path><circle cx="7.5" cy="17.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>
        },
        { 
            path: '/sell', 
            label: 'Sell & Earn',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><path d="M8 10a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2 2 2 0 0 1-2 2H10a2 2 0 0 0-2 2 2 2 0 0 0 2 2h4a2 2 0 0 0 2-2"></path></svg>
        },
        { 
            path: '/disposal-centers', 
            label: 'Nearby Centers',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        },
        { 
            path: '/threshold', 
            label: 'Threshold',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><path d="M3 3v18"></path><path d="M7 17l4-8 4 6 5-10"></path></svg>
        },
        { 
            path: '/settings', 
            label: 'Settings',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        },
        { 
            path: '/profile', 
            label: 'Profile',
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        },
    ];

    const navItems = allNavItems.filter(item => {
        if (currentUser?.role === 'collector') {
            return !['/dashboard', '/request-pickup', '/sell', '/threshold', '/eco-rider-dashboard', '/detect'].includes(item.path);
        } else if (currentUser?.role === 'eco-rider') {
            return !['/dashboard', '/request-pickup', '/sell', '/threshold', '/collector-dashboard', '/detect'].includes(item.path);
        } else {
            return !['/collector-dashboard', '/eco-rider-dashboard'].includes(item.path);
        }
    });

    return (
        <>
            {/* Desktop Sidebar - Unchanged Layout */}
            <aside className="sidebar desktop-only">
                <nav className="sidebar-nav">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link 
                                key={item.path} 
                                to={item.path} 
                                className={`sidebar-item ${isActive ? 'active' : ''}`}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.8rem 1rem',
                                    borderRadius: '12px',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    marginBottom: '0.4rem',
                                    textDecoration: 'none',
                                    fontSize: '0.925rem',
                                    fontWeight: isActive ? '600' : '500'
                                }}
                            >
                                <span className="sidebar-icon" style={{ 
                                    color: isActive ? 'var(--accent-green)' : 'var(--text-secondary)',
                                    opacity: isActive ? 1 : 0.8
                                }}>{item.icon}</span>
                                <span className="sidebar-label">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Mobile Sliding Sidebar (Drawer) */}
            <div className={`mobile-sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
            <aside className={`mobile-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="mobile-sidebar-header">
                    <span className="mobile-sidebar-title">Menu</span>
                    <button className="mobile-sidebar-close" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <nav className="mobile-sidebar-nav">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link 
                                key={item.path} 
                                to={item.path} 
                                className={`mobile-sidebar-item ${isActive ? 'active' : ''}`}
                                onClick={onClose}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem 1.25rem',
                                    borderRadius: '12px',
                                    marginBottom: '0.5rem',
                                    textDecoration: 'none',
                                    fontWeight: isActive ? '600' : '500',
                                    background: isActive ? 'var(--accent-green-soft)' : 'transparent',
                                    color: isActive ? 'var(--accent-green)' : 'var(--text-primary)',
                                    border: isActive ? '1px solid var(--accent-green)' : '1px solid transparent'
                                }}
                            >
                                <span className="mobile-sidebar-icon">{item.icon}</span>
                                <span className="mobile-sidebar-label">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
