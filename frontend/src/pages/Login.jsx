import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Mock login logic
            setTimeout(() => {
                login({
                    uid: 'mock-user-123',
                    email: loginMethod === 'email' ? email : `${phone}@phone.com`,
                    displayName: loginMethod === 'email' ? email.split('@')[0] : 'Phone User',
                    phoneNumber: loginMethod === 'phone' ? phone : ''
                });
                navigate('/');
            }, 800);
        } catch (err) {
            console.error('Auth error:', err);
            setError('Authentication failed.');
            setLoading(false);
        }
    };

    const handleSendOtp = () => {
        if (!phone || phone.length < 10) {
            setError('Please enter a valid phone number.');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setShowOtp(true);
            setLoading(false);
        }, 1000);
    };

    const handleGoogleAuth = async () => {
        setLoading(true);
        setError('');
        try {
            // Mock Google auth
            setTimeout(() => {
                login({
                    uid: 'mock-google-123',
                    email: 'demo@google.com',
                    displayName: 'Demo User'
                });
                navigate('/');
            }, 800);
        } catch (err) {
            console.error('Google Auth error:', err);
            setError('Google Authentication failed.');
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: 'calc(100vh - 120px)', background: 'var(--bg-color)', display: 'flex', flexDirection: 'column' }}>
            {/* Split Layout Container */}
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', flex: 1 }}>
                
                {/* Left Side: Hero Text & Illustration */}
                <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', background: 'var(--sidebar-bg)', padding: '0.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
                    
                    {/* Text Section */}
                    <div style={{ maxWidth: '650px', margin: '0 auto', width: '100%', zIndex: 2 }}>
                        <h1 style={{ fontSize: '2.8rem', color: 'var(--heading-color)', fontWeight: '800', lineHeight: 1, marginBottom: '0.4rem', letterSpacing: '-0.04em' }}>
                            Platform for <br/> Waste Segregation <br/> and Waste Management
                        </h1>
                        <h2 style={{ fontSize: '1.6rem', color: 'var(--accent-green)', fontWeight: '700', marginBottom: '0.8rem' }}>
                            Awareness and Action
                        </h2>
                        <div style={{ width: '60px', height: '4px', background: '#22c55e', marginBottom: '1rem' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '1.2rem' }}>
                            <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--card-bg)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1.5 2 2 4.5 2 9 0 5-4.5 9-10 9z"></path>
                                </svg>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.5, margin: 0 }}>
                                Small steps today, a cleaner tomorrow.<br/>
                                Let's build a sustainable future together.
                            </p>
                        </div>
                    </div>

                    {/* Illustration Section */}
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', zIndex: 1 }}>
                        <svg width="100%" viewBox="0 0 500 220" style={{ maxWidth: '800px', minWidth: '400px' }} xmlns="http://www.w3.org/2000/svg">
                            <g transform="translate(85, 0)">
                                {/* Shadow */}
                                <ellipse cx="250" cy="190" rx="220" ry="8" fill="rgba(0,0,0,0.06)" />
                                
                                {/* Citizen (Woman throwing trash) */}
                                <g transform="translate(-65, 80)">
                                    <line x1="22" y1="65" x2="15" y2="105" stroke="#4b5563" strokeWidth="7" strokeLinecap="round" />
                                    <line x1="15" y1="65" x2="25" y2="105" stroke="#374151" strokeWidth="7" strokeLinecap="round" />
                                    <rect x="10" y="25" width="16" height="40" rx="6" fill="#16a34a" />
                                    <circle cx="18" cy="12" r="9" fill="#ffedd5" />
                                    <circle cx="21" cy="11" r="0.8" fill="#1f2937" />
                                    <circle cx="25" cy="11" r="0.8" fill="#1f2937" />
                                    <path d="M 21 15 Q 23 17 25 15" stroke="#1f2937" fill="none" strokeWidth="0.5" strokeLinecap="round" />
                                    <path d="M 9 12 C 9 -2 27 -2 27 12 C 27 18 20 20 18 20 C 13 20 9 18 9 12 Z" fill="#1f2937" />
                                    <circle cx="6" cy="15" r="5" fill="#1f2937" />
                                    <path d="M 18 35 L 35 45 L 45 45" stroke="#ffedd5" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    <path d="M 45 45 C 55 35 65 50 55 65 C 45 70 40 50 45 45 Z" fill="#374151" />
                                    
                                    <g transform="translate(18, -25)">
                                        <rect x="-40" y="-12" width="80" height="24" rx="12" fill="white" stroke="#e5e7eb" strokeWidth="1" />
                                        <path d="M -5 12 L 5 12 L 0 20 Z" fill="white" stroke="#e5e7eb" strokeWidth="1" />
                                        <path d="M -5 11 L 5 11 L 0 11 Z" fill="white" />
                                        <text y="4" textAnchor="middle" fontSize="9" fill="#374151" fontWeight="700">It's wet waste.</text>
                                    </g>
                                </g>

                                {/* Truck Flatbed Base */}
                                <rect x="60" y="165" width="245" height="12" rx="4" fill="#374151" />
                                <rect x="60" y="150" width="10" height="15" fill="#e5e7eb" />
                                <rect x="295" y="150" width="10" height="15" fill="#e5e7eb" />
                                <line x1="65" y1="75" x2="65" y2="165" stroke="#e5e7eb" strokeWidth="4" />
                                <line x1="300" y1="75" x2="300" y2="165" stroke="#e5e7eb" strokeWidth="4" />
                                <line x1="65" y1="75" x2="300" y2="75" stroke="#e5e7eb" strokeWidth="4" />
                                
                                {/* Bins */}
                                <g transform="translate(68, 76)">
                                    <g transform="translate(0, 0)">
                                        <path d="M 5 20 L 45 20 L 40 90 L 10 90 Z" fill="#16a34a" />
                                        <path d="M 0 20 L 5 12 L -25 -5 L -30 3 Z" fill="#15803d" />
                                        <circle cx="25" cy="47.5" r="14" fill="white" />
                                        <g transform="translate(16, 38.5) scale(0.18)">
                                            <path d="M 20 39 A 32 32 0 0 1 80 39" stroke="#22C55E" strokeWidth="12" fill="none" />
                                            <path d="M 90.3 35.3 L 69.7 42.7 L 86.1 55.9 Z" fill="#22C55E" />
                                            <path d="M 80 61 A 32 32 0 0 1 20 61" stroke="#1D4ED8" strokeWidth="12" fill="none" />
                                            <path d="M 9.7 64.7 L 30.3 57.3 L 13.9 44.1 Z" fill="#1D4ED8" />
                                            <g transform="translate(50, 50) scale(0.9)">
                                                <rect x="-6" y="-18" width="12" height="4" rx="2" fill="#22C55E" />
                                                <rect x="-12" y="-14" width="24" height="4" rx="1" fill="#22C55E" />
                                                <path d="M -10 -10 L 10 -10 L 8 12 L -8 12 Z" fill="#22C55E" />
                                                <rect x="-4.5" y="-7" width="2" height="13" rx="1" fill="white" />
                                                <rect x="-1" y="-7" width="2" height="13" rx="1" fill="white" />
                                                <rect x="2.5" y="-7" width="2" height="13" rx="1" fill="white" />
                                            </g>
                                        </g>
                                        <text x="25" y="72" fontSize="6.5" fill="white" textAnchor="middle" fontWeight="bold">Wet</text>
                                        <text x="25" y="82" fontSize="6.5" fill="white" textAnchor="middle" fontWeight="bold">Waste</text>
                                    </g>

                                    {[
                                        { id: 'dry', color: '#1d4ed8', lid: '#1e40af', text: 'Dry', x: 48 },
                                        { id: 'sanitary', color: '#dc2626', lid: '#b91c1c', text: 'Sanitary', x: 96 },
                                        { id: 'hazardous', color: '#262626', lid: '#171717', text: 'Hazardous', x: 144 }
                                    ].map(bin => (
                                        <g key={bin.id} transform={`translate(${bin.x}, 0)`}>
                                            <path d="M 5 20 L 45 20 L 40 90 L 10 90 Z" fill={bin.color} />
                                            <path d="M 0 20 L 50 20 L 45 12 L 5 12 Z" fill={bin.lid} />
                                            <circle cx="25" cy="47.5" r="14" fill="white" />
                                            <g transform="translate(16, 38.5) scale(0.18)">
                                                <path d="M 20 39 A 32 32 0 0 1 80 39" stroke="#22C55E" strokeWidth="12" fill="none" />
                                                <path d="M 90.3 35.3 L 69.7 42.7 L 86.1 55.9 Z" fill="#22C55E" />
                                                <path d="M 80 61 A 32 32 0 0 1 20 61" stroke="#1D4ED8" strokeWidth="12" fill="none" />
                                                <path d="M 9.7 64.7 L 30.3 57.3 L 13.9 44.1 Z" fill="#1D4ED8" />
                                                <g transform="translate(50, 50) scale(0.9)">
                                                    <rect x="-6" y="-18" width="12" height="4" rx="2" fill="#22C55E" />
                                                    <rect x="-12" y="-14" width="24" height="4" rx="1" fill="#22C55E" />
                                                    <path d="M -10 -10 L 10 -10 L 8 12 L -8 12 Z" fill="#22C55E" />
                                                    <rect x="-4.5" y="-7" width="2" height="13" rx="1" fill="white" />
                                                    <rect x="-1" y="-7" width="2" height="13" rx="1" fill="white" />
                                                    <rect x="2.5" y="-7" width="2" height="13" rx="1" fill="white" />
                                                </g>
                                            </g>
                                            <text x="25" y="72" fontSize={bin.text.length > 8 ? "5" : "6.5"} fill="white" textAnchor="middle" fontWeight="bold">{bin.text}</text>
                                            <text x="25" y="82" fontSize="6.5" fill="white" textAnchor="middle" fontWeight="bold">Waste</text>
                                        </g>
                                    ))}
                                </g>

                                {/* Wheels */}
                                <g transform="translate(0, 10)">
                                    <circle cx="120" cy="170" r="22" fill="#111827" />
                                    <circle cx="120" cy="170" r="14" fill="#4b5563" />
                                    <circle cx="120" cy="170" r="8" fill="#9ca3af" />
                                    <circle cx="175" cy="170" r="22" fill="#111827" />
                                    <circle cx="175" cy="170" r="14" fill="#4b5563" />
                                    <circle cx="175" cy="170" r="8" fill="#9ca3af" />
                                    <circle cx="340" cy="170" r="22" fill="#111827" />
                                    <circle cx="340" cy="170" r="14" fill="#4b5563" />
                                    <circle cx="340" cy="170" r="8" fill="#9ca3af" />
                                </g>

                                {/* Truck Cabin */}
                                <g transform="translate(305, 85)">
                                    <path d="M 60 0 C 60 -15 45 -25 25 -25 H -40 V 95 H 50 C 65 95 75 80 70 65 L 60 0 Z" fill="#ffffff" />
                                    <path d="M 55 5 C 55 -5 45 -15 30 -15 H -25 V 30 H 60 L 55 5 Z" fill="#e5e7eb" />
                                    <path d="M 53 7 C 53 -2 44 -12 30 -12 H -22 V 27 H 58 L 53 7 Z" fill="#1f2937" />
                                    <line x1="-25" y1="-25" x2="-25" y2="95" stroke="#e5e7eb" strokeWidth="2" />
                                    <path d="M 30 30 V 95" stroke="#e5e7eb" strokeWidth="2" />
                                    <line x1="-25" y1="95" x2="30" y2="95" stroke="#e5e7eb" strokeWidth="2" />
                                    <rect x="-20" y="40" width="10" height="4" rx="2" fill="#9ca3af" />
                                    <path d="M 80 60 H 50 V 85 H 80 C 88 85 88 70 80 60 Z" fill="#1f2937" />
                                    <circle cx="70" cy="73" r="5" fill="#facc15" />
                                    <circle cx="70" cy="73" r="2" fill="#fff" />
                                    
                                    {/* Logo on Cabin Door - Moved Lower */}
                                    <g transform="translate(-10, 32) scale(0.38)">
                                        <path d="M 20 39 A 32 32 0 0 1 80 39" stroke="#22C55E" strokeWidth="12" fill="none" />
                                        <path d="M 90.3 35.3 L 69.7 42.7 L 86.1 55.9 Z" fill="#22C55E" />
                                        <path d="M 80 61 A 32 32 0 0 1 20 61" stroke="#1D4ED8" strokeWidth="12" fill="none" />
                                        <path d="M 9.7 64.7 L 30.3 57.3 L 13.9 44.1 Z" fill="#1D4ED8" />
                                        <g transform="translate(50, 50) scale(0.9)">
                                            <rect x="-6" y="-18" width="12" height="4" rx="2" fill="#22C55E" />
                                            <rect x="-12" y="-14" width="24" height="4" rx="1" fill="#22C55E" />
                                            <path d="M -10 -10 L 10 -10 L 8 12 L -8 12 Z" fill="#22C55E" />
                                            <rect x="-4.5" y="-7" width="2" height="13" rx="1" fill="white" />
                                            <rect x="-1" y="-7" width="2" height="13" rx="1" fill="white" />
                                            <rect x="2.5" y="-7" width="2" height="13" rx="1" fill="white" />
                                        </g>
                                    </g>
                                </g>

                                {/* Branding on Truck Back Side */}
                                <g transform="translate(80, 55)">
                                    <text x="110" y="0" fontFamily="sans-serif" fontSize="16" fontWeight="900" fill="#047857" textAnchor="middle" style={{ letterSpacing: '1px' }}>Recyc<tspan fill="#1d4ed8">Link</tspan></text>
                                    <line x1="40" y1="5" x2="180" y2="5" stroke="#e5e7eb" strokeWidth="1" opacity="0.5" />
                                </g>

                                {/* Worker Helping */}
                                <g transform="translate(18, 80)">
                                    <line x1="15" y1="65" x2="15" y2="105" stroke="#374151" strokeWidth="8" strokeLinecap="round" />
                                    <line x1="25" y1="65" x2="25" y2="105" stroke="#374151" strokeWidth="8" strokeLinecap="round" />
                                    <circle cx="20" cy="12" r="9" fill="#ffedd5" />
                                    <circle cx="17" cy="11" r="0.8" fill="#1f2937" />
                                    <circle cx="23" cy="11" r="0.8" fill="#1f2937" />
                                    <path d="M 17 15 Q 20 17 23 15" stroke="#1f2937" fill="none" strokeWidth="0.5" strokeLinecap="round" />
                                    <path d="M 10 8 C 10 0 30 0 30 8 L 35 8 L 35 12 L 10 12 Z" fill="#16a34a" />
                                    <circle cx="20" cy="6" r="2" fill="white" />
                                    <rect x="10" y="25" width="20" height="40" rx="4" fill="#ffffff" stroke="#e5e7eb" strokeWidth="2" />
                                    <path d="M 10 25 L 30 25 L 30 35 L 10 35 Z" fill="#16a34a" />
                                    <path d="M 10 35 L 20 45 L 30 35 Z" fill="#16a34a" /> 
                                    <g transform="translate(14, 28) scale(0.12)">
                                        <path d="M 20 39 A 32 32 0 0 1 80 39" stroke="#22C55E" strokeWidth="12" fill="none" />
                                        <path d="M 90.3 35.3 L 69.7 42.7 L 86.1 55.9 Z" fill="#22C55E" />
                                        <path d="M 80 61 A 32 32 0 0 1 20 61" stroke="#1D4ED8" strokeWidth="12" fill="none" />
                                        <path d="M 9.7 64.7 L 30.3 57.3 L 13.9 44.1 Z" fill="#1D4ED8" />
                                        <g transform="translate(50, 50) scale(0.9)">
                                            <rect x="-6" y="-18" width="12" height="4" rx="2" fill="#22C55E" />
                                            <rect x="-12" y="-14" width="24" height="4" rx="1" fill="#22C55E" />
                                            <path d="M -10 -10 L 10 -10 L 8 12 L -8 12 Z" fill="#22C55E" />
                                            <rect x="-4.5" y="-7" width="2" height="13" rx="1" fill="white" />
                                            <rect x="-1" y="-7" width="2" height="13" rx="1" fill="white" />
                                            <rect x="2.5" y="-7" width="2" height="13" rx="1" fill="white" />
                                        </g>
                                    </g>
                                    <path d="M 30 30 L 50 15" stroke="#ffedd5" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    <path d="M 10 30 L 10 50" stroke="#ffedd5" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    
                                    <g transform="translate(20, -32)">
                                        <rect x="-40" y="-12" width="80" height="32" rx="12" fill="white" stroke="#e5e7eb" strokeWidth="1" />
                                        <path d="M -5 20 L 5 20 L 0 28 Z" fill="white" stroke="#e5e7eb" strokeWidth="1" />
                                        <path d="M -5 19 L 5 19 L 0 19 Z" fill="white" />
                                        <text y="0" textAnchor="middle" fontSize="9" fill="#374151" fontWeight="700">
                                            <tspan x="0" dy="0">What waste is</tspan>
                                            <tspan x="0" dy="11">that ma'am?</tspan>
                                        </text>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div style={{ flex: '1 1 400px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem 2rem', background: 'var(--bg-color)' }}>
                    <div className="info-card" style={{ maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', padding: '1.8rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                        <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.4rem', fontSize: '1.6rem', fontWeight: '800' }}>
                            {isSignUp ? 'Create an Account' : 'Welcome Back'}
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                            {isSignUp ? 'Join the green movement today' : 'Log in to manage your eco impact'}
                        </p>

                        {error && (
                            <div className="civic-message" style={{ background: '#fef2f2', color: '#dc2626', borderColor: '#fca5a5', marginBottom: '1.5rem', padding: '0.8rem', fontSize: '0.9rem' }}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.2rem' }}>
                            {loginMethod === 'email' ? (
                                <>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{ padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--sidebar-bg)', color: 'var(--text-primary)', fontSize: '0.95rem', outline: 'none' }}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        style={{ padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--sidebar-bg)', color: 'var(--text-primary)', fontSize: '0.95rem', outline: 'none' }}
                                    />
                                </>
                            ) : (
                                <>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <div style={{ padding: '0.85rem', background: 'var(--sidebar-bg)', borderRadius: '10px', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>+91</div>
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                            style={{ flex: 1, padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--sidebar-bg)', color: 'var(--text-primary)', fontSize: '0.95rem', outline: 'none' }}
                                        />
                                    </div>
                                    {showOtp && (
                                        <input
                                            type="text"
                                            placeholder="Enter 6-digit OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                            maxLength={6}
                                            style={{ padding: '0.85rem', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--sidebar-bg)', color: 'var(--text-primary)', fontSize: '0.95rem', outline: 'none' }}
                                        />
                                    )}
                                </>
                            )}
                            
                            {loginMethod === 'phone' && !showOtp ? (
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    className="btn-secondary"
                                    disabled={loading}
                                    style={{ marginTop: '0.3rem', width: '100%', padding: '0.85rem', fontSize: '1rem' }}
                                >
                                    {loading ? 'Sending OTP...' : 'Send OTP'}
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="btn-secondary"
                                    disabled={loading}
                                    style={{ marginTop: '0.3rem', width: '100%', padding: '0.85rem', fontSize: '1rem' }}
                                >
                                    {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
                                </button>
                            )}
                        </form>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
                            <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }}></div>
                            <span style={{ color: '#9CA3AF', fontSize: '0.85rem', fontWeight: '600' }}>OR</span>
                            <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }}></div>
                        </div>

                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => {
                                setLoginMethod(loginMethod === 'email' ? 'phone' : 'email');
                                setShowOtp(false);
                                setError('');
                            }}
                            disabled={loading}
                            style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem', background: '#ffffff', color: '#16a34a', border: '1px solid #16a34a', padding: '0.85rem' }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>{loginMethod === 'email' ? 'Continue with Phone' : 'Continue with Email'}</span>
                        </button>

                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={handleGoogleAuth}
                            disabled={loading}
                            style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem', background: '#ffffff', color: '#374151', border: '1px solid #E5E7EB', padding: '0.85rem' }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Continue with Google</span>
                        </button>

                        <p style={{ color: '#6B7280', fontSize: '0.95rem', margin: 0 }}>
                            {isSignUp ? 'Already have an account?' : "New user?"}{' '}
                            <span
                                onClick={() => setIsSignUp(!isSignUp)}
                                style={{ color: '#16a34a', cursor: 'pointer', fontWeight: '700' }}
                            >
                                {isSignUp ? 'Login here' : 'Sign Up here'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
