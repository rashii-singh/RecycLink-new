import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function EcoRiderDashboard() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    
    const [riderProfile] = useState({
        name: currentUser?.displayName || 'Eco Partner',
        vehicleType: 'EV Scooter',
        serviceArea: 'Chandigarh / Mohali',
        availability: 'Active',
        ecoScore: 92,
        completedPickups: 48
    });

    const [requests, setRequests] = useState([]);
    const [stats, setStats] = useState({
        todayEarnings: '₹850',
        totalEarnings: '₹8,450',
        rating: 4.9,
        activeTasks: 0
    });
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const loadRequests = () => {
            const stored = JSON.parse(localStorage.getItem('pickupRequests') || '[]');
            // For Eco Rider, we show Pending (Available) and those they have Accepted/Picked Up
            const relevant = stored.filter(req => 
                req.status === 'Pending' || 
                (req.riderId === currentUser.uid && ['Accepted', 'Picked Up'].includes(req.status))
            );
            setRequests(relevant);
            setStats(prev => ({ ...prev, activeTasks: relevant.filter(r => r.riderId === currentUser.uid).length }));
        };

        loadRequests();
        const interval = setInterval(loadRequests, 5000);
        return () => clearInterval(interval);
    }, [currentUser.uid]);

    const updateRequestStatus = (id, newStatus) => {
        const stored = JSON.parse(localStorage.getItem('pickupRequests') || '[]');
        const updated = stored.map(req => {
            if (req.id === id) {
                const update = { ...req, status: newStatus };
                if (newStatus === 'Accepted') {
                    update.riderId = currentUser.uid;
                    update.riderName = currentUser.displayName || 'Eco Rider';
                    update.vehicleType = 'EV Scooter';
                    update.estimatedArrival = '15 mins';
                }
                if (newStatus === 'Picked Up') update.pickedUpAt = new Date().toISOString();
                if (newStatus === 'Delivered') update.deliveredAt = new Date().toISOString();
                return update;
            }
            return req;
        });
        localStorage.setItem('pickupRequests', JSON.stringify(updated));
        
        if (newStatus === 'Delivered') {
            setStats(prev => ({
                ...prev,
                todayEarnings: `₹${parseInt(prev.todayEarnings.replace('₹', '')) + 250}`,
                totalEarnings: `₹${parseInt(prev.totalEarnings.replace(/[^0-9]/g, '')) + 250}`
            }));
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    const handleReject = (id) => {
        // In a real app, this would hide it for this rider
        setRequests(prev => prev.filter(r => r.id !== id));
    };

    if (currentUser?.role !== 'eco-rider') {
        return (
            <div className="page page-container" style={{ textAlign: 'center', paddingTop: '5rem' }}>
                <h2>Access Denied</h2>
                <p>You do not have permission to view this page.</p>
                <button className="btn-secondary" onClick={() => navigate('/')}>Go to Home</button>
            </div>
        );
    }

    return (
        <div className="page page-container fade-in" style={{ maxWidth: '1200px', position: 'relative' }}>
            {/* Success Toast */}
            {showToast && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    background: '#10b981',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
                    zIndex: 1000,
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    animation: 'slideIn 0.3s ease-out'
                }}>
                    <span>✅</span> Delivery Completed! +₹250 added.
                </div>
            )}
            {/* Top Bar: Profile & Quick Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem', alignItems: 'start' }}>
                {/* Rider Profile Section */}
                <div className="info-card" style={{ padding: '2rem', display: 'flex', gap: '2rem', alignItems: 'center', background: 'var(--card-bg)' }}>
                    <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--accent-green-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                        🛵
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <h2 style={{ margin: 0, fontSize: '1.8rem' }}>{riderProfile.name}</h2>
                            <span style={{ background: '#10b98122', color: '#10b981', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '800' }}>{riderProfile.availability}</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            <div><strong>Vehicle:</strong> {riderProfile.vehicleType}</div>
                            <div><strong>Area:</strong> {riderProfile.serviceArea}</div>
                            <div><strong>Eco Score:</strong> {riderProfile.ecoScore}</div>
                            <div><strong>Pickups:</strong> {riderProfile.completedPickups}</div>
                        </div>
                    </div>
                </div>

                {/* Earnings Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="info-card" style={{ padding: '1.5rem', textAlign: 'center', background: 'var(--accent-green-soft)', border: 'none' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-green)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Today's Earnings</div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-green)' }}>{stats.todayEarnings}</div>
                    </div>
                    <div className="info-card" style={{ padding: '1.5rem', textAlign: 'center', background: 'var(--accent-blue-soft)', border: 'none' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-blue)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Total Earnings</div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-blue)' }}>{stats.totalEarnings}</div>
                    </div>
                    <div className="info-card" style={{ padding: '1.5rem', textAlign: 'center', background: '#fffbeb', border: 'none' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#d97706', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Eco Rating</div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: '#d97706' }}>{stats.rating} ★</div>
                    </div>
                    <div className="info-card" style={{ padding: '1.5rem', textAlign: 'center', background: '#f5f3ff', border: 'none' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#7c3aed', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Active Tasks</div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: '#7c3aed' }}>{stats.activeTasks}</div>
                    </div>
                </div>
            </div>

            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>Pickup Queue</h2>
            
            {/* Available Pickup Requests */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '1.5rem' }}>
                {requests.length === 0 ? (
                    <div className="info-card" style={{ gridColumn: '1/-1', padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍃</div>
                        <h3>No pending requests in your area</h3>
                        <p>Relax! We'll notify you when new pickups arrive.</p>
                    </div>
                ) : (
                    requests.map(req => (
                        <div key={req.id} className="info-card" style={{ 
                            padding: '1.8rem', 
                            borderLeft: `8px solid ${
                                req.status === 'Pending' ? '#3b82f6' : 
                                req.status === 'Accepted' ? '#f59e0b' : '#10b981'
                            }`,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.2rem'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-secondary)', background: 'var(--border-color)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>#{req.id}</span>
                                    <h3 style={{ margin: '0.5rem 0 0.2rem 0', fontSize: '1.3rem' }}>{req.category || 'Mixed Waste'}</h3>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--accent-green)', fontWeight: '700' }}>Est. Earning: ₹250</div>
                                </div>
                                <div style={{ 
                                    background: req.status === 'Pending' ? '#3b82f611' : '#10b98111',
                                    color: req.status === 'Pending' ? '#3b82f6' : '#10b981',
                                    padding: '0.4rem 1rem',
                                    borderRadius: '30px',
                                    fontSize: '0.85rem',
                                    fontWeight: '800'
                                }}>
                                    {req.status}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1rem', background: 'var(--bg-color)', borderRadius: '12px' }}>
                                <div>
                                    <div style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Distance</div>
                                    <div style={{ fontWeight: '600' }}>2.4 km</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Time</div>
                                    <div style={{ fontWeight: '600' }}>{req.timeSlot || 'Immediate'}</div>
                                </div>
                                <div style={{ gridColumn: '1/-1' }}>
                                    <div style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Location</div>
                                    <div style={{ fontWeight: '600' }}>Sector 12, Near Rose Garden</div>
                                </div>
                            </div>

                            {/* Rider Actions */}
                            <div style={{ display: 'flex', gap: '0.8rem', marginTop: 'auto' }}>
                                {req.status === 'Pending' && (
                                    <>
                                        <button 
                                            className="btn-secondary" 
                                            onClick={() => updateRequestStatus(req.id, 'Accepted')}
                                            style={{ flex: 2 }}
                                        >
                                            Accept Pickup
                                        </button>
                                        <button 
                                            onClick={() => handleReject(req.id)}
                                            style={{ flex: 1, background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}

                                {req.status === 'Accepted' && (
                                    <>
                                        <button 
                                            className="btn-secondary" 
                                            onClick={() => updateRequestStatus(req.id, 'Picked Up')}
                                            style={{ flex: 2, background: '#f59e0b' }}
                                        >
                                            Mark Picked Up
                                        </button>
                                        <button 
                                            style={{ flex: 1, background: 'var(--accent-blue)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}
                                            onClick={() => window.location.href = 'tel:+919876543210'}
                                        >
                                            Call User
                                        </button>
                                    </>
                                )}

                                {req.status === 'Picked Up' && (
                                    <button 
                                        className="btn-secondary" 
                                        onClick={() => updateRequestStatus(req.id, 'Delivered')}
                                        style={{ flex: 1, background: '#10b981' }}
                                    >
                                        Confirm Delivery
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
