import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const WASTE_TYPES = ['Plastic', 'Organic', 'Paper', 'Metal', 'E-Waste', 'Glass', 'Hazardous'];
const TIME_SLOTS = ['09:00 AM - 12:00 PM', '12:00 PM - 03:00 PM', '03:00 PM - 06:00 PM', '06:00 PM - 09:00 PM'];

const mapContainerStyle = {
    width: '100%',
    height: '250px',
    borderRadius: '16px',
    marginTop: '1rem'
};

const defaultCenter = {
    lat: 12.9716, // Bangalore
    lng: 77.5946
};

export default function RequestPickup() {
    const navigate = useNavigate();
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [date, setDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Location state
    const [location, setLocation] = useState(defaultCenter);
    const [locationLoaded, setLocationLoaded] = useState(false);
    const [mapError, setMapError] = useState(false);

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newLoc = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setLocation(newLoc);
                    setLocationLoaded(true);
                },
                (error) => {
                    console.log("Geolocation error:", error);
                    setLocationLoaded(true); // Still marked as loaded to show map with default
                }
            );
        } else {
            setLocationLoaded(true);
        }
    }, []);

    const toggleWasteType = (type) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedTypes.length === 0 || !date || !timeSlot) {
            alert("Please fill in all fields and select at least one waste type.");
            return;
        }

        setLoading(true);
        try {
            const existing = JSON.parse(localStorage.getItem('pickupRequests') || '[]');
            const newReq = {
                id: Math.random().toString(36).substring(7),
                categories: selectedTypes,
                date: date,
                timeSlot: timeSlot,
                location: { latitude: location.lat, longitude: location.lng },
                timestamp: new Date().toISOString(),
                status: 'Pending',
                isMultiple: true
            };
            localStorage.setItem('pickupRequests', JSON.stringify([...existing, newReq]));

            setSuccess(true);
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (error) {
            console.error("Error saving request:", error);
            alert("Failed to submit request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page page-container fade-in" style={{ maxWidth: '600px' }}>
            <div style={{ textAlign: 'left', paddingLeft: '0.5rem', marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', color: 'var(--heading-color)', fontWeight: '700', margin: '0 0 0.5rem 0', lineHeight: '1.2', paddingBottom: '0.2rem' }}>
                    Schedule a Pickup
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0, fontWeight: '500' }}>
                    Select your waste types and pick a convenient time
                </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Search Collectors/Buyers */}
                <div className="info-card" style={{ background: 'var(--card-bg)', borderRadius: '20px', padding: '1.25rem', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ margin: '0 0 1rem 0' }}>Find Nearby Collectors & Buyers</h3>
                    <div style={{ position: 'relative' }}>
                        <input 
                            type="text" 
                            placeholder="Search for scrap dealers, buyers or collectors..." 
                            style={{ paddingLeft: '3rem', borderRadius: '14px' }}
                        />
                        <span style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-green)' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </span>
                    </div>
                    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.8rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                        {['All', 'Collectors', 'Buyers', 'Scrap Shops'].map(filter => (
                            <button 
                                key={filter}
                                type="button"
                                style={{ 
                                    padding: '0.5rem 1.2rem', 
                                    borderRadius: '20px', 
                                    border: '1px solid var(--border-color)', 
                                    background: filter === 'All' ? 'var(--accent-green)' : 'var(--sidebar-bg)',
                                    color: filter === 'All' ? '#ffffff' : 'var(--text-secondary)',
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>


                {/* Waste Type Selection */}
                <div className="info-card" style={{ background: 'var(--card-bg)', borderRadius: '20px', padding: '1.25rem', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ margin: '0 0 1rem 0' }}>Select Waste Types</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.8rem' }}>
                        {WASTE_TYPES.map(type => (
                            <div
                                key={type}
                                onClick={() => toggleWasteType(type)}
                                style={{
                                    padding: '0.8rem 1.2rem',
                                    borderRadius: '12px',
                                    background: selectedTypes.includes(type) ? 'var(--sidebar-bg)' : 'var(--bg-color)',
                                    color: selectedTypes.includes(type) ? 'var(--accent-green)' : 'var(--text-secondary)',
                                    border: `2px solid ${selectedTypes.includes(type) ? 'var(--accent-green)' : 'var(--border-color)'}`,
                                    cursor: 'pointer',
                                    fontWeight: '700',
                                    transition: 'all 0.2s',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {type}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Date & Time Slot */}
                <div className="info-card" style={{ background: 'var(--card-bg)', borderRadius: '20px', padding: '1.25rem', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ margin: '0 0 1rem 0' }}>Date & Time</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Preferred Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                style={{ padding: '1rem', borderRadius: '12px', border: '2px solid var(--border-color)', fontSize: '1rem', outline: 'none', background: 'var(--sidebar-bg)', color: 'var(--text-primary)' }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Time Slot</label>
                            <select
                                value={timeSlot}
                                onChange={(e) => setTimeSlot(e.target.value)}
                                style={{ padding: '1rem', borderRadius: '12px', border: '2px solid var(--border-color)', fontSize: '1rem', outline: 'none', background: 'var(--sidebar-bg)', color: 'var(--text-primary)' }}
                            >
                                <option value="">Select a slot</option>
                                {TIME_SLOTS.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Success Message Overlay */}
                {success && (
                    <div style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'var(--card-bg)',
                        backdropFilter: 'blur(16px)',
                        padding: '2rem 1.5rem',
                        borderRadius: '30px',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                        zIndex: 2000,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        border: '2px solid var(--accent-blue)',
                        width: 'calc(100% - 30px)',
                        maxWidth: '400px'
                    }}>
                        <div style={{ fontSize: '3rem' }}>🎉</div>
                        <h2 style={{ fontSize: '1.75rem', color: 'var(--accent-green)', margin: 0, background: 'none', webkitTextFillColor: 'initial', lineHeight: '1.2' }}>Order Successful!</h2>
                        <p style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.9rem' }}>Your waste pickup has been scheduled. You will be redirected to the dashboard shortly.</p>
                        <div style={{ width: '100%', height: '4px', background: 'var(--accent-blue-soft)', borderRadius: '2px', overflow: 'hidden', marginTop: '1rem' }}>
                            <div className="progress-bar-fill" style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-green))', animation: 'progress 2s linear' }}></div>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading || success}
                    style={{ 
                        padding: '1.2rem', 
                        borderRadius: '16px', 
                        fontSize: '1.1rem', 
                        fontWeight: '700', 
                        boxShadow: '0 10px 20px rgba(37, 99, 235, 0.2)',
                        background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-green) 100%)',
                        color: '#ffffff',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    {loading ? 'Submitting...' : success ? 'Order Successful ✅' : 'Submit Pickup Request 🚛'}
                </button>

                {/* Support Contact */}
                <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--accent-green)' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--accent-green)', fontWeight: '600' }}>
                        Need urgent assistance? Call Support: <span style={{ fontSize: '1rem', fontWeight: '800' }}>+91 1800-456-7890</span>
                    </p>
                </div>
            </form>
        </div>
    );
}
