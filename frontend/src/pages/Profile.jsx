import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ProfileAvatar from '../components/ProfileAvatar';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { currentUser, logout } = useAuth();
    const { language, changeLanguage, t } = useLanguage();
    const navigate = useNavigate();
    const [view, setView] = useState('profile'); // 'profile', 'history', 'about', 'privacy'

    if (!currentUser) return null;

    const handleLogout = async () => {
        try {
            logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    }

    const ProfileOption = ({ icon, text, onClick, color = 'var(--text-primary)' }) => (
        <div
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.2rem 1.5rem',
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'background 0.2s',
                width: '100%',
                boxSizing: 'border-box'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <span style={{ color: color === '#dc2626' ? '#dc2626' : '#6B7280', display: 'flex' }}>{icon}</span>
                <span style={{ fontWeight: '600', color: color, fontSize: '1.05rem' }}>{text}</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </div>
    );

    if (view === 'history') {
        return (
            <div className="page fade-in">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <button onClick={() => setView('profile')} style={{ background: 'none', border: 'none', color: '#064e3b', fontSize: '1.5rem', cursor: 'pointer', display: 'flex' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </button>
                    <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: '800', color: '#064e3b' }}>Pickup History</h2>
                </div>

                <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--card-bg)', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1.5rem' }}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '700', margin: 0 }}>No pickup history yet</p>
                    <p style={{ color: '#6B7280', fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: '500' }}>Your completed recycling pickups will appear here.</p>
                </div>
            </div>
        )
    }

    if (view === 'about') {
        return (
            <div className="page fade-in">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <button onClick={() => setView('profile')} style={{ background: 'none', border: 'none', color: '#064e3b', fontSize: '1.5rem', cursor: 'pointer', display: 'flex' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </button>
                    <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: '800', color: '#064e3b' }}>About RecycLink</h2>
                </div>

                <div style={{ background: 'var(--card-bg)', borderRadius: '24px', padding: '2rem', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <p style={{ color: '#4b5563', lineHeight: '1.6', fontSize: '1rem', margin: 0 }}>
                            RecycLink is a comprehensive smart waste management platform designed to revolutionize how we handle household and industrial waste. Our goal is to bridge the gap between waste generators and recyclers.
                        </p>
                        
                        <div style={{ display: 'grid', gap: '1.2rem' }}>
                            {[
                                { title: 'AI-Based Segregation', desc: 'Powerful image recognition to help you identify and sort waste correctly.' },
                                { title: 'Smart Disposal Guidance', desc: 'Get instant bin recommendations and eco-tips for various materials.' },
                                { title: 'Pickup Support', desc: 'Schedule hassle-free waste pickups and track your recycling impact.' },
                                { title: 'Sustainability Mission', desc: 'Promoting a circular economy and reducing landfill waste through technology.' }
                            ].map((item, i) => (
                                <div key={i} style={{ padding: '1.2rem', background: 'var(--sidebar-bg)', borderRadius: '16px' }}>
                                    <h4 style={{ color: 'var(--heading-color)', margin: '0 0 0.4rem 0', fontWeight: '700' }}>{item.title}</h4>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.5' }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (view === 'privacy') {
        return (
            <div className="page fade-in">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <button onClick={() => setView('profile')} style={{ background: 'none', border: 'none', color: '#064e3b', fontSize: '1.5rem', cursor: 'pointer', display: 'flex' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </button>
                    <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: '800', color: '#064e3b' }}>Privacy Policy</h2>
                </div>

                <div style={{ background: 'var(--card-bg)', borderRadius: '24px', padding: '2rem', border: '1px solid var(--border-color)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <section>
                            <h4 style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem 0', fontWeight: '700' }}>Data Collection</h4>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                We collect minimal data required to provide our services, including your name, email, and pickup address.
                            </p>
                        </section>

                        <section>
                            <h4 style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem 0', fontWeight: '700' }}>Permissions</h4>
                            <ul style={{ color: '#64748b', fontSize: '0.9rem', paddingLeft: '1.2rem', display: 'grid', gap: '0.8rem' }}>
                                <li><strong>Location:</strong> Used to detect nearby disposal centers and coordinate pickups.</li>
                                <li><strong>Camera/Images:</strong> Used exclusively for waste detection and classification via AI.</li>
                            </ul>
                        </section>

                        <section>
                            <h4 style={{ color: 'var(--text-primary)', margin: '0 0 0.5rem 0', fontWeight: '700' }}>Data Security</h4>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                All uploaded images and personal data are encrypted and stored securely. We never share your personal information with third parties without your consent.
                            </p>
                        </section>

                        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #dcfce7' }}>
                            <p style={{ color: '#166534', fontSize: '0.85rem', margin: 0, fontWeight: '500' }}>
                                For any privacy-related queries, please contact us at <strong>privacy@recyclink.com</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="page fade-in">
            <h2 style={{ textAlign: 'left', marginBottom: '0.5rem', fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>Profile</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Top Profile Card */}
                <div style={{
                    background: 'var(--card-bg)',
                    borderRadius: '24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden',
                    padding: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.2rem'
                }}>
                    <ProfileAvatar user={currentUser} size={65} />
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', margin: '0 0 0.1rem 0', fontWeight: '800' }}>
                            {currentUser.displayName || 'User'}
                        </h3>
                        <p style={{ color: '#6B7280', margin: '0', fontSize: '0.9rem', fontWeight: '500' }}>{currentUser.email}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontSize: '0.85rem', fontWeight: '700', marginTop: '0.4rem' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <span>{currentUser.phoneNumber || '8217221253'}</span>
                        </div>
                    </div>
                </div>

                {/* Options Card - White Table Style */}
                <div style={{
                    background: 'var(--card-bg)',
                    borderRadius: '24px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden'
                }}>
                    <ProfileOption 
                        icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>} 
                        text="Pickup History" 
                        onClick={() => setView('history')} 
                    />
                    <ProfileOption
                        icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>}
                        text="Help & FAQ"
                        onClick={() => navigate('/help')}
                    />
                    <ProfileOption
                        icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>}
                        text="About App"
                        onClick={() => setView('about')}
                    />
                    <ProfileOption
                        icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>}
                        text="Send Feedback"
                        onClick={() => alert("Feedback feature coming soon!")}
                    />
                    <ProfileOption
                        icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>}
                        text="Privacy Policy"
                        onClick={() => setView('privacy')}
                    />
                    <ProfileOption
                        icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>}
                        text="Logout"
                        color="#dc2626"
                        onClick={handleLogout}
                    />
                </div>
            </div>

            {/* Version Info */}
            <div style={{ marginTop: '3rem', textAlign: 'center', opacity: 0.4 }}>
                <p style={{ fontSize: '0.75rem', fontWeight: '600' }}>RecycLink v2.4.0</p>
            </div>
        </div>
    );
}
