import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CollectorDashboard() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [stats, setStats] = useState({
        totalCollected: 1250,
        pendingPickups: 0,
        earnings: 5400,
        rating: 4.8
    });

    useEffect(() => {
        // Load all pending requests from users
        const loadRequests = () => {
            const stored = JSON.parse(localStorage.getItem('pickupRequests') || '[]');
            const pending = stored.filter(req => req.status === 'Pending' || req.status === 'Accepted');
            setRequests(pending);
            setStats(prev => ({ ...prev, pendingPickups: pending.length }));
        };

        loadRequests();
        const interval = setInterval(loadRequests, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleAcceptRequest = (id) => {
        const stored = JSON.parse(localStorage.getItem('pickupRequests') || '[]');
        const updated = stored.map(req => {
            if (req.id === id) {
                return { ...req, status: 'Accepted', collectorId: currentUser.uid, acceptedAt: new Date().toISOString() };
            }
            return req;
        });
        localStorage.setItem('pickupRequests', JSON.stringify(updated));
        setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Accepted' } : req));
    };

    const handleCompleteRequest = (id) => {
        const stored = JSON.parse(localStorage.getItem('pickupRequests') || '[]');
        const updated = stored.map(req => {
            if (req.id === id) {
                return { ...req, status: 'Completed', completedAt: new Date().toISOString() };
            }
            return req;
        });
        localStorage.setItem('pickupRequests', JSON.stringify(updated));
        setRequests(prev => prev.filter(req => req.id !== id));
        setStats(prev => ({ 
            ...prev, 
            totalCollected: prev.totalCollected + 15, // Mock increment
            earnings: prev.earnings + 150 
        }));
    };

    if (currentUser?.role !== 'collector') {
        return (
            <div className="page page-container" style={{ textAlign: 'center', paddingTop: '5rem' }}>
                <h2>Access Denied</h2>
                <p>You do not have permission to view this page.</p>
                <button className="btn-secondary" onClick={() => navigate('/')}>Go to Home</button>
            </div>
        );
    }

    return (
        <div className="page page-container fade-in" style={{ maxWidth: '1200px' }}>
            {/* Header */}
            <div style={{ marginBottom: '3rem', textAlign: 'left' }}>
                <h1 style={{ fontSize: '2.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    Collector Dashboard
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {currentUser.displayName}. Manage your collection route and earnings.</p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div className="info-card" style={{ padding: '1.5rem', textAlign: 'center', borderBottom: '4px solid var(--accent-green)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Total Collected</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-green)' }}>{stats.totalCollected} kg</div>
                </div>
                <div className="info-card" style={{ padding: '1.5rem', textAlign: 'center', borderBottom: '4px solid var(--accent-blue)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Pending Requests</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-blue)' }}>{stats.pendingPickups}</div>
                </div>
                <div className="info-card" style={{ padding: '1.5rem', textAlign: 'center', borderBottom: '4px solid #f59e0b' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Today's Earnings</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#f59e0b' }}>₹{stats.earnings}</div>
                </div>
                <div className="info-card" style={{ padding: '1.5rem', textAlign: 'center', borderBottom: '4px solid #8b5cf6' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Service Rating</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#8b5cf6' }}>{stats.rating} ★</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Available Requests */}
                <div>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Available Pickups</h2>
                    {requests.length === 0 ? (
                        <div className="info-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            No pending pickup requests in your area.
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {requests.map(req => (
                                <div key={req.id} className="info-card" style={{ padding: '1.5rem', borderLeft: `6px solid ${req.status === 'Accepted' ? 'var(--accent-blue)' : 'var(--accent-green)'}` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)' }}>#{req.id}</div>
                                            <h3 style={{ fontSize: '1.2rem', margin: '0.2rem 0' }}>{req.category || 'Mixed Waste'}</h3>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ background: req.status === 'Accepted' ? 'var(--accent-blue-soft)' : 'var(--accent-green-soft)', color: req.status === 'Accepted' ? 'var(--accent-blue)' : 'var(--accent-green)', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '800' }}>
                                                {req.status}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Location</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Sector 12, Mohali, Punjab</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Time Slot</div>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{req.date || 'Today'} | {req.timeSlot || 'Anytime'}</div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                                        {req.status === 'Pending' ? (
                                            <button 
                                                className="btn-secondary" 
                                                onClick={() => handleAcceptRequest(req.id)}
                                                style={{ flex: '1 1 140px', padding: '0.8rem' }}
                                            >
                                                Accept Pickup
                                            </button>
                                        ) : (
                                            <button 
                                                className="btn-secondary" 
                                                onClick={() => handleCompleteRequest(req.id)}
                                                style={{ flex: '1 1 140px', padding: '0.8rem', background: 'var(--accent-blue)', color: 'white' }}
                                            >
                                                Mark Completed
                                            </button>
                                        )}
                                        <button className="btn-secondary" style={{ flex: '1 1 140px', padding: '0.8rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>View Map</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Service Info</h2>
                    <div className="info-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                        <h4 style={{ color: 'var(--accent-green)', marginBottom: '0.8rem' }}>Collector Guidelines</h4>
                        <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li>Wear safety gear during collection.</li>
                            <li>Verify waste segregation before accepting.</li>
                            <li>Update status immediately after completion.</li>
                            <li>Be polite and professional with users.</li>
                        </ul>
                    </div>

                    <div className="info-card" style={{ padding: '1.5rem', background: 'var(--accent-blue-soft)', border: 'none' }}>
                        <h4 style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>Need Help?</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--accent-blue)' }}>Contact support at 1800-RECYCLE for any route or payment issues.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
