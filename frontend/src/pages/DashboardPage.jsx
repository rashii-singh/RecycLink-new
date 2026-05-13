import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CANCELLATION_REASONS = [
    "Changed my mind",
    "Scheduled by mistake",
    "Waste already collected",
    "Time slot no longer convenient",
    "Other"
];

export default function DashboardPage() {
    const navigate = useNavigate()
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [cancellingId, setCancellingId] = useState(null)
    const [cancelReason, setCancelReason] = useState('')
    const [otherReason, setOtherReason] = useState('')

    useEffect(() => {
        const loadRequests = () => {
            const stored = JSON.parse(localStorage.getItem('pickupRequests') || '[]');
            const processed = stored.map(req => {
                const isDate = req.timestamp && req.timestamp.includes('T');
                return {
                    id: req.id,
                    category: req.category || (req.categories ? req.categories.join(', ') : 'General'),
                    latitude: req.location?.latitude || req.latitude,
                    longitude: req.location?.longitude || req.longitude,
                    timestamp: isDate ? new Date(req.timestamp).toLocaleString() : 'Just now',
                    rawTimestamp: req.timestamp || new Date().toISOString(),
                    status: req.status || 'Pending',
                    date: req.date,
                    timeSlot: req.timeSlot
                }
            }).sort((a, b) => new Date(b.rawTimestamp) - new Date(a.rawTimestamp));
            
            setRequests(processed);
            setLoading(false);
        };
        
        loadRequests();
        const interval = setInterval(loadRequests, 5000);
        return () => clearInterval(interval);
    }, [])

    const handleCancelRequest = async (id) => {
        const finalReason = cancelReason === 'Other' ? otherReason : cancelReason;
        if (!finalReason) {
            alert("Please select a reason for cancellation.");
            return;
        }

        try {
            const stored = JSON.parse(localStorage.getItem('pickupRequests') || '[]');
            const updated = stored.map(req => {
                if (req.id === id) {
                    return { ...req, status: 'Cancelled', cancellationReason: finalReason, cancelledAt: new Date().toISOString() };
                }
                return req;
            });
            localStorage.setItem('pickupRequests', JSON.stringify(updated));
            setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Cancelled' } : req));
            
            setCancellingId(null);
            setCancelReason('');
            setOtherReason('');
        } catch (error) {
            console.error("Error cancelling request:", error);
            alert("Failed to cancel request.");
        }
    };

    return (
        <div className="dashboard-container fade-in">
            {/* Header Section */}
            <div style={{ textAlign: 'left', paddingLeft: '0.5rem', marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', color: 'var(--heading-color)', fontWeight: '700', margin: '0 0 0.5rem 0', lineHeight: '1.2', paddingBottom: '0.2rem' }}>
                    Smart Waste Collection Dashboard
                </h1>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', margin: 0, fontWeight: '500' }}>
                    Track, manage, and optimize your waste pickup requests in real-time
                </p>
            </div>

            {/* Link to Full Request Page */}
            <div 
                className="info-card" 
                onClick={() => navigate('/request-pickup')}
                style={{
                    background: 'var(--card-bg)',
                    borderRadius: '20px',
                    padding: '1.5rem 2.5rem',
                    boxShadow: 'var(--shadow-sm)',
                    marginBottom: '3rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '2rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: '1px solid var(--border-color)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = 'var(--accent-green)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.borderColor = 'var(--border-color)' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: '1 1 300px' }}>
                    <div style={{ width: '85px', height: '85px', borderRadius: '50%', background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                            <path d="M9 16l2 2 4-4"></path>
                        </svg>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <h2 style={{ fontSize: '1.75rem', color: 'var(--heading-color)', margin: '0 0 0.25rem 0', fontWeight: '700' }}>
                            Request Pickup
                        </h2>
                        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', margin: 0 }}>
                            Schedule a pickup for your waste easily.
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <svg width="280" height="140" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}>
                        {/* Shadow */}
                        <ellipse cx="200" cy="180" rx="160" ry="8" fill="rgba(0,0,0,0.06)" />
                        
                        {/* Bin Back */}
                        <path d="M 360 50 L 380 60 V 150 L 360 160 Z" fill="#166534" />
                        
                        {/* Container / Bin */}
                        <path d="M 140 30 H 360 C 370 30 380 40 380 55 L 360 160 C 358 165 350 170 340 170 H 140 Z" fill="#16a34a" />
                        
                        {/* Blue Swooshes */}
                        <path d="M 140 30 H 200 L 160 170 H 140 Z" fill="#1d4ed8" opacity="0.9" />
                        <path d="M 195 30 H 220 L 180 170 H 155 Z" fill="#2563eb" opacity="0.8" />
                        
                        {/* Standardized Logo on Back with White Base - Centered Alignment */}
                        <g transform="translate(225, 62) scale(0.55)">
                            <circle cx="50" cy="50" r="45" fill="white" />
                            <g transform="scale(0.9) translate(5, 5)">
                                {/* Top Green Arrow */}
                                <path 
                                    d="M 20 39 A 32 32 0 0 1 80 39" 
                                    stroke="#16a34a" 
                                    strokeWidth="12" 
                                    fill="none" 
                                />
                                <path 
                                    d="M 90.3 35.3 L 69.7 42.7 L 86.1 55.9 Z" 
                                    fill="#16a34a" 
                                />

                                {/* Bottom Blue Arrow */}
                                <path 
                                    d="M 80 61 A 32 32 0 0 1 20 61" 
                                    stroke="#1d4ed8" 
                                    strokeWidth="12" 
                                    fill="none" 
                                />
                                <path 
                                    d="M 9.7 64.7 L 30.3 57.3 L 13.9 44.1 Z" 
                                    fill="#1d4ed8" 
                                />

                                {/* Center Dustbin */}
                                <g transform="translate(50, 50) scale(0.9)">
                                    <rect x="-6" y="-18" width="12" height="4" rx="2" fill="#16a34a" />
                                    <rect x="-12" y="-14" width="24" height="4" rx="1" fill="#16a34a" />
                                    <path d="M -10 -10 L 10 -10 L 8 12 L -8 12 Z" fill="#16a34a" />
                                    <rect x="-4.5" y="-7" width="2" height="13" rx="1" fill="white" />
                                    <rect x="-1" y="-7" width="2" height="13" rx="1" fill="white" />
                                    <rect x="2.5" y="-7" width="2" height="13" rx="1" fill="white" />
                                </g>
                            </g>
                        </g>

                        {/* branding on container - Moved right to align with logo center */}
                        <g transform="translate(252.5, 130)">
                            <text x="0" y="0" textAnchor="middle" fontFamily="sans-serif" fontSize="22" fontWeight="900" fill="white" style={{ letterSpacing: '1px' }}>Recyc<tspan fill="#93c5fd">Link</tspan></text>
                        </g>
                        
                        {/* Chassis */}
                        <rect x="50" y="155" width="310" height="15" rx="5" fill="#374151" />
                        
                        {/* Cabin */}
                        <path d="M 40 75 C 40 60 55 50 75 50 H 140 V 170 H 50 C 35 170 25 155 30 140 L 40 75 Z" fill="#ffffff" />
                        
                        {/* Windows */}
                        <path d="M 45 80 C 45 70 55 60 70 60 H 125 V 105 H 40 L 45 80 Z" fill="#e5e7eb" />
                        <path d="M 47 82 C 47 73 56 63 70 63 H 122 V 102 H 42 L 47 82 Z" fill="#1f2937" />
                        
                        {/* Door Lines */}
                        <line x1="125" y1="50" x2="125" y2="170" stroke="#e5e7eb" strokeWidth="2" />
                        <path d="M 70 105 V 170" stroke="#e5e7eb" strokeWidth="2" />
                        <line x1="70" y1="170" x2="125" y2="170" stroke="#e5e7eb" strokeWidth="2" />
                        <rect x="110" y="115" width="10" height="4" rx="2" fill="#9ca3af" />
                        
                        {/* Bumper */}
                        <path d="M 20 135 H 50 V 160 H 20 C 12 160 12 145 20 135 Z" fill="#1f2937" />
                        <circle cx="30" cy="148" r="5" fill="#facc15" />
                        <circle cx="30" cy="148" r="2" fill="#fff" />
                        
                        {/* Logo on Door - Moved Higher to avoid wheel */}
                        <g transform="translate(80, 115) scale(0.38)">
                            <circle cx="50" cy="50" r="45" fill="white" />
                            <g transform="scale(0.9) translate(5, 5)">
                                {/* Top Green Arrow */}
                                <path 
                                    d="M 20 39 A 32 32 0 0 1 80 39" 
                                    stroke="#22C55E" 
                                    strokeWidth="12" 
                                    fill="none" 
                                />
                                <path 
                                    d="M 90.3 35.3 L 69.7 42.7 L 86.1 55.9 Z" 
                                    fill="#22C55E" 
                                />

                                {/* Bottom Blue Arrow */}
                                <path 
                                    d="M 80 61 A 32 32 0 0 1 20 61" 
                                    stroke="#1D4ED8" 
                                    strokeWidth="12" 
                                    fill="none" 
                                />
                                <path 
                                    d="M 9.7 64.7 L 30.3 57.3 L 13.9 44.1 Z" 
                                    fill="#1D4ED8" 
                                />

                                {/* Center Dustbin */}
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
                        
                        {/* Wheels */}
                        <circle cx="85" cy="170" r="24" fill="#111827" />
                        <circle cx="85" cy="170" r="16" fill="#4b5563" />
                        <circle cx="85" cy="170" r="10" fill="#9ca3af" />
                        <circle cx="85" cy="170" r="4" fill="#f3f4f6" />
                        
                        <circle cx="260" cy="170" r="24" fill="#111827" />
                        <circle cx="260" cy="170" r="16" fill="#4b5563" />
                        <circle cx="260" cy="170" r="10" fill="#9ca3af" />
                        <circle cx="260" cy="170" r="4" fill="#f3f4f6" />
                        
                        <circle cx="315" cy="170" r="24" fill="#111827" />
                        <circle cx="315" cy="170" r="16" fill="#4b5563" />
                        <circle cx="315" cy="170" r="10" fill="#9ca3af" />
                        <circle cx="315" cy="170" r="4" fill="#f3f4f6" />
                    </svg>

                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--card-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Requests List Section */}
            <div style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <h2 style={{ fontSize: '2.1rem', color: 'var(--text-primary)', margin: '0 0 0.5rem 0', fontWeight: '700' }}>Active Pickup Requests</h2>
                        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Monitor all your pending and active pickup requests</p>
                    </div>
                    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                        Total: {requests.length}
                    </div>
                </div>

                {loading ? (
                    <div className="info-card" style={{ padding: '4rem', textAlign: 'center' }}>
                        <div className="loading-spinner" style={{ marginBottom: '1rem', animation: 'spin 2s linear infinite' }}>
                            <svg 
                                width="80" 
                                height="80" 
                                viewBox="0 0 100 100" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Top Green Arrow */}
                                <path 
                                    d="M 20 39 A 32 32 0 0 1 80 39" 
                                    stroke="#22C55E" 
                                    strokeWidth="12" 
                                    fill="none" 
                                />
                                <path 
                                    d="M 90.3 35.3 L 69.7 42.7 L 86.1 55.9 Z" 
                                    fill="#22C55E" 
                                />

                                {/* Bottom Blue Arrow */}
                                <path 
                                    d="M 80 61 A 32 32 0 0 1 20 61" 
                                    stroke="#1D4ED8" 
                                    strokeWidth="12" 
                                    fill="none" 
                                />
                                <path 
                                    d="M 9.7 64.7 L 30.3 57.3 L 13.9 44.1 Z" 
                                    fill="#1D4ED8" 
                                />

                                {/* Center Dustbin */}
                                <g transform="translate(50, 50) scale(0.9)">
                                    <rect x="-6" y="-18" width="12" height="4" rx="2" fill="#22C55E" />
                                    <rect x="-12" y="-14" width="24" height="4" rx="1" fill="#22C55E" />
                                    <path d="M -10 -10 L 10 -10 L 8 12 L -8 12 Z" fill="#22C55E" />
                                    <rect x="-4.5" y="-7" width="2" height="13" rx="1" fill="white" />
                                    <rect x="-1" y="-7" width="2" height="13" rx="1" fill="white" />
                                    <rect x="2.5" y="-7" width="2" height="13" rx="1" fill="white" />
                                </g>
                            </svg>
                        </div>
                        <p style={{ color: '#6B7280', fontWeight: '500' }}>Fetching your pickup requests...</p>
                    </div>
                ) : requests.length === 0 ? (
                    <div className="info-card" style={{ padding: '4rem', textAlign: 'center', background: 'var(--sidebar-bg)', border: '2px dashed var(--border-color)' }}>
                        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                            <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Truck Body */}
                                <rect x="30" y="35" width="60" height="30" rx="6" fill="var(--sidebar-bg)" stroke="var(--border-color)" strokeWidth="2" />
                                <path d="M90 40C90 37 92 35 95 35H110V65H90V40Z" fill="var(--sidebar-bg)" stroke="var(--border-color)" strokeWidth="2" />
                                
                                {/* Window */}
                                <path d="M95 40H105V50H90V43C90 41.3 91.3 40 93 40H95Z" fill="var(--bg-color)" stroke="var(--border-color)" strokeWidth="1.5" />
                                
                                {/* Recycling Symbol on Truck */}
                                <g transform="translate(48, 35) scale(0.25)">
                                    <path d="M 20 39 A 32 32 0 0 1 80 39" stroke="var(--accent-green)" strokeWidth="8" fill="none" />
                                    <path d="M 90.3 35.3 L 69.7 42.7 L 86.1 55.9 Z" fill="var(--accent-green)" />
                                    <path d="M 80 61 A 32 32 0 0 1 20 61" stroke="var(--accent-blue, #1d4ed8)" strokeWidth="8" fill="none" />
                                    <path d="M 9.7 64.7 L 30.3 57.3 L 13.9 44.1 Z" fill="var(--accent-blue, #1d4ed8)" />
                                    
                                    {/* Added Colored Dustbin at center */}
                                    <g transform="translate(50, 50) scale(0.8)">
                                        <rect x="-6" y="-18" width="12" height="4" rx="2" fill="var(--accent-green)" />
                                        <rect x="-12" y="-14" width="24" height="4" rx="1" fill="var(--accent-green)" />
                                        <path d="M -10 -10 L 10 -10 L 8 12 L -8 12 Z" fill="var(--accent-green)" />
                                        <rect x="-4.5" y="-7" width="2" height="13" rx="1" fill="white" />
                                        <rect x="-1" y="-7" width="2" height="13" rx="1" fill="white" />
                                        <rect x="2.5" y="-7" width="2" height="13" rx="1" fill="white" />
                                    </g>
                                </g>

                                {/* Wheels */}
                                <circle cx="45" cy="65" r="8" fill="var(--sidebar-bg)" stroke="var(--border-color)" strokeWidth="2" />
                                <circle cx="45" cy="65" r="3" fill="var(--border-color)" />
                                <circle cx="75" cy="65" r="8" fill="var(--sidebar-bg)" stroke="var(--border-color)" strokeWidth="2" />
                                <circle cx="75" cy="65" r="3" fill="var(--border-color)" />
                                <circle cx="100" cy="65" r="8" fill="var(--sidebar-bg)" stroke="var(--border-color)" strokeWidth="2" />
                                <circle cx="100" cy="65" r="3" fill="var(--border-color)" />
                            </svg>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: '600' }}>
                            No pickup requests yet. Start by scheduling one!
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {requests.map(req => (
                            <div key={req.id} style={{
                                background: 'var(--card-bg)',
                                border: '1px solid var(--border-color)',
                                padding: '1.5rem',
                                borderRadius: '24px',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                                transition: 'all 0.2s'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', textAlign: 'left' }}>
                                        <div style={{ width: '55px', height: '55px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
                                            {req.category.includes('Plastic') ? '🧴' : req.category.includes('E-Waste') ? '💻' : '📦'}
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                            <span style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--text-primary)' }}>{req.category}</span>
                                            {req.date && <span style={{ fontSize: '0.9rem', color: 'var(--accent-green)', fontWeight: '700' }}>📅 {req.date} • {req.timeSlot}</span>}
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>ID: {req.id.slice(0, 8)}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.6rem' }}>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            fontWeight: '800',
                                            color: req.status === 'Pending' ? '#b45309' : 
                                                   req.status === 'Cancelled' ? '#991b1b' : 
                                                   req.status === 'Accepted' || req.status === 'Picked Up' || req.status === 'In Transit' ? '#1e40af' :
                                                   '#065f46',
                                            background: req.status === 'Pending' ? '#fef3c7' : 
                                                        req.status === 'Cancelled' ? '#fee2e2' : 
                                                        req.status === 'Accepted' || req.status === 'Picked Up' || req.status === 'In Transit' ? '#dbeafe' :
                                                        '#dcfce7',
                                            padding: '6px 14px',
                                            borderRadius: '20px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>
                                            {req.status}
                                        </span>
                                        {req.status === 'Pending' && (
                                            <button
                                                onClick={() => setCancellingId(req.id)}
                                                style={{ background: 'none', border: 'none', color: '#9CA3AF', fontSize: '0.85rem', cursor: 'pointer', fontWeight: '700', textDecoration: 'underline' }}
                                            >
                                                Cancel Request
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {req.riderId && req.status !== 'Delivered' && req.status !== 'Completed' && (
                                    <div style={{ marginTop: '1.2rem', padding: '1rem', background: 'var(--accent-green-soft)', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid var(--accent-green)22' }}>
                                        <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'white', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🛵</div>
                                        <div style={{ flex: 1, textAlign: 'left' }}>
                                            <div style={{ fontSize: '0.95rem', fontWeight: '800' }}>{req.riderName || 'Eco Rider Assigned'}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{req.vehicleType || 'EV Scooter'} • Arriving in ~{req.estimatedArrival || '15 mins'}</div>
                                        </div>
                                        <button 
                                            style={{ background: 'var(--accent-blue)', color: 'white', border: 'none', padding: '0.6rem 1rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer' }}
                                            onClick={() => window.location.href = 'tel:+919876543210'}
                                        >
                                            Call Rider
                                        </button>
                                    </div>
                                )}

                                {/* Cancellation Dialog */}
                                {cancellingId === req.id && (
                                    <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#fff5f5', borderRadius: '18px', border: '1px solid #fed7d7' }}>
                                        <h4 style={{ margin: '0 0 1rem 0', color: '#991b1b', fontSize: '1rem', fontWeight: '800' }}>Reason for cancellation?</h4>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                            <select
                                                value={cancelReason}
                                                onChange={(e) => setCancelReason(e.target.value)}
                                                style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid #feb2b2', outline: 'none' }}
                                            >
                                                <option value="">Select a reason</option>
                                                {CANCELLATION_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                                            </select>

                                            {cancelReason === 'Other' && (
                                                <input
                                                    type="text"
                                                    placeholder="Please specify reason..."
                                                    value={otherReason}
                                                    onChange={(e) => setOtherReason(e.target.value)}
                                                    style={{ padding: '0.8rem', borderRadius: '10px', border: '1px solid #feb2b2', outline: 'none' }}
                                                />
                                            )}

                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                <button
                                                    onClick={() => handleCancelRequest(req.id)}
                                                    style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', background: '#dc2626', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer' }}
                                                >
                                                    Confirm Cancellation
                                                </button>
                                                <button
                                                    onClick={() => setCancellingId(null)}
                                                    style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', background: '#fff', color: '#4B5563', border: '1px solid #d1d5db', fontWeight: '700', cursor: 'pointer' }}
                                                >
                                                    Back
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Support Info */}
            <div style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--border-color)' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600' }}>
                    Need help? Call Customer Support: <span style={{ color: 'var(--accent-green)' }}>+91 1800-456-7890</span>
                </p>
            </div>
        </div>
    )
}