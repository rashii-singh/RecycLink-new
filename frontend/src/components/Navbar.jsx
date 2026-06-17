import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { useLocationContext } from '../context/LocationContext'

export default function Navbar(props) {
    const { currentUser } = useAuth()
    const { language, changeLanguage } = useLanguage()
    const { selectedLoc } = useLocationContext()
    const navigate = useNavigate()
    const location = useLocation()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [locDropdownOpen, setLocDropdownOpen] = useState(false)
    const navRef = useRef(null)

    const getLangChar = (lang) => {
        if (lang === 'kn') return 'ಕ';
        if (lang === 'hi') return 'अ';
        return 'A';
    }

    const getSecondaryChar = (lang) => {
        if (lang === 'en') return 'ಕ';
        return 'A';
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setDropdownOpen(false)
                setLocDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        const addScript = () => {
            if (document.getElementById('google-translate-script')) return;
            const script = document.createElement('script');
            script.id = 'google-translate-script';
            script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        };

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,hi,kn',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
            }, 'google_translate_element');
        };

        addScript();
    }, []);

    return (
        <nav className="navbar" ref={navRef} style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.6rem 1.5rem',
            background: 'var(--navbar-bg)',
            backdropFilter: 'blur(16px)',
            boxShadow: 'var(--shadow-sm)',
            borderBottom: '1px solid var(--border-color)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Hamburger Menu - Mobile Only */}
                {currentUser && (
                    <button 
                        className="mobile-only"
                        onClick={props.onMenuClick}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: '0.5rem',
                            cursor: 'pointer',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',
                            transition: 'background 0.2s'
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                )}

                <Link to="/" className="nav-logo" style={{ 
                    textDecoration: 'none', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem',
                    marginLeft: '0',
                    transition: 'all 0.3s ease'
                }}>
                    <svg 
                        width="45" 
                        height="45" 
                        viewBox="0 0 100 100" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ flexShrink: 0 }}
                    >
                        {/* Top Green Arrow */}
                        <path 
                            d="M 20 39 A 32 32 0 0 1 80 39" 
                            stroke="var(--accent-green)" 
                            strokeWidth="12" 
                            fill="none" 
                            strokeLinecap="round"
                        />
                        <path 
                            d="M 90.3 35.3 L 69.7 42.7 L 86.1 55.9 Z" 
                            fill="var(--accent-green)" 
                        />

                        {/* Bottom Blue Arrow */}
                        <path 
                            d="M 80 61 A 32 32 0 0 1 20 61" 
                            stroke="var(--accent-blue)" 
                            strokeWidth="12" 
                            fill="none" 
                            strokeLinecap="round"
                        />
                        <path 
                            d="M 9.7 64.7 L 30.3 57.3 L 13.9 44.1 Z" 
                            fill="var(--accent-blue)" 
                        />

                        {/* Center Dustbin */}
                        <g transform="translate(50, 50) scale(0.85)">
                            <rect x="-6" y="-18" width="12" height="4" rx="2" fill="var(--accent-green)" />
                            <rect x="-12" y="-14" width="24" height="4" rx="1" fill="var(--accent-green)" />
                            <path d="M -10 -10 L 10 -10 L 8 12 L -8 12 Z" fill="var(--accent-green)" />
                            <rect x="-4.5" y="-7" width="2" height="13" rx="1" fill="white" />
                            <rect x="-1" y="-7" width="2" height="13" rx="1" fill="white" />
                            <rect x="2.5" y="-7" width="2" height="13" rx="1" fill="white" />
                        </g>
                    </svg>
                    <span className="nav-logo-text" style={{ fontWeight: '700', fontSize: '1.4rem', letterSpacing: '-0.02em', display: 'flex' }}>
                        <span style={{ color: 'var(--accent-green)' }}>Recyc</span>
                        <span style={{ color: 'var(--accent-blue)' }}>Link</span>
                    </span>
                </Link>
            </div>

            <div className="nav-actions-gap" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Location Indicator with Hover Tooltip */}
                <div className="nav-tooltip-container">
                    <div
                        onClick={() => navigate('/settings')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '42px',
                            height: '42px',
                            background: 'var(--card-bg)',
                            borderRadius: '50%',
                            border: '1.5px solid var(--card-border)',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-green)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--card-border)'}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <defs>
                                <linearGradient id="locGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="var(--accent-blue)" />
                                    <stop offset="100%" stopColor="var(--accent-green)" />
                                </linearGradient>
                            </defs>
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="url(#locGradient)"></path>
                            <circle cx="12" cy="10" r="3" stroke="var(--accent-green)"></circle>
                        </svg>
                    </div>
                    
                    <div className="nav-tooltip">
                        <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-primary)', whiteSpace: 'nowrap', lineHeight: 1.1 }}>
                            {selectedLoc.name && selectedLoc.name.startsWith('Lat:') ? 'Current Location' : selectedLoc.name}
                        </span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--accent-green)', fontWeight: '700', opacity: 0.8 }}>
                            {selectedLoc.name && selectedLoc.name.startsWith('Lat:') ? 'Bangalore, KA' : selectedLoc.sub}
                        </span>
                    </div>
                </div>

                {/* Custom Stylized Translation Icon */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            width: '50px',
                            height: '50px',
                        }}
                    >
                        <div style={{
                            position: 'relative',
                            width: '44px',
                            height: '44px'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '0px',
                                left: '0px',
                                width: '32px',
                                height: '36px',
                                backgroundColor: 'var(--accent-green)',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: '900',
                                fontSize: '1.3rem',
                                zIndex: 2,
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                transition: 'all 0.3s ease'
                            }}>
                                {getLangChar(language)}
                            </div>
                            <div style={{
                                position: 'absolute',
                                bottom: '2px',
                                right: '2px',
                                width: '30px',
                                height: '34px',
                                backgroundColor: 'var(--accent-green-soft)',
                                border: '1.5px solid var(--accent-green)',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--accent-green)',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                zIndex: 1,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                transition: 'all 0.3s ease'
                            }}>
                                {getSecondaryChar(language)}
                            </div>
                        </div>
                    </button>

                    {dropdownOpen && (
                        <div className="profile-dropdown" style={{ right: 0, width: '160px', zIndex: 1000, marginTop: '12px' }}>
                            <div className="dropdown-item" onClick={() => { changeLanguage('en'); setDropdownOpen(false); }}>English</div>
                            <div className="dropdown-item" onClick={() => { changeLanguage('kn'); setDropdownOpen(false); }}>ಕನ್ನಡ (Kannada)</div>
                            <div className="dropdown-item" onClick={() => { changeLanguage('hi'); setDropdownOpen(false); }}>हिंदी (Hindi)</div>
                        </div>
                    )}
                </div>

                <div id="google_translate_element" style={{ display: 'none' }}></div>

                {/* Logged-in User Profile Section */}
                {currentUser && (
                    <div className="nav-tooltip-container">
                        <Link to="/profile" style={{ textDecoration: 'none' }}>
                            <div style={{ 
                                width: '42px', 
                                height: '42px', 
                                borderRadius: '50%', 
                                background: 'linear-gradient(135deg, var(--accent-green) 0%, var(--accent-blue) 100%)', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                color: 'white', 
                                fontWeight: '800', 
                                fontSize: '1rem',
                                boxShadow: '0 2px 6px rgba(34, 197, 94, 0.3)',
                                transition: 'all 0.2s',
                                border: '1.5px solid var(--card-border)'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#22c55e'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--card-border)'}
                            >
                                {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
                            </div>
                        </Link>
                        
                        <div className="nav-tooltip profile-tooltip">
                            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1.1 }}>
                                {currentUser.displayName || 'User'}
                            </span>
                            <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                                {currentUser.email}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}