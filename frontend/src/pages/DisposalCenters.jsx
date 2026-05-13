import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const mockCenters = [
    {
        id: 1,
        name: "GreenEarth Recycling Hub",
        distance: "1.2 km",
        wasteTypes: ["Plastic", "Paper", "Metal", "E-waste"],
        contact: "+91 98765 43210",
        address: "42, Industrial Layout, Bangalore, KA - 560001",
        status: "Open",
        isOpen: true,
        mapsLink: "https://maps.google.com/?q=recycling+center+bangalore"
    },
    {
        id: 2,
        name: "EcoSafe Waste Management",
        distance: "3.5 km",
        wasteTypes: ["Organic", "Kitchen Waste", "Glass"],
        contact: "+91 87654 32109",
        address: "78, Main Road, HSR Layout, Bangalore, KA - 560102",
        status: "Closed",
        isOpen: false,
        mapsLink: "https://maps.google.com/?q=waste+management+bangalore"
    },
    {
        id: 3,
        name: "City Civic Recovery Center",
        distance: "5.8 km",
        wasteTypes: ["Hazardous", "Chemicals", "Batteries"],
        contact: "+91 76543 21098",
        address: "Sec 4, Outer Ring Road, Bangalore, KA - 560043",
        status: "Open",
        isOpen: true,
        mapsLink: "https://maps.google.com/?q=civic+recovery+center"
    }
];

export default function DisposalCenters() {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [centers, setCenters] = useState(mockCenters);
    const [locationDetected, setLocationDetected] = useState(false);

    const handleDetectLocation = () => {
        setLoading(true);
        // Simulate GPS detection
        setTimeout(() => {
            setLocationDetected(true);
            setLoading(false);
        }, 1500);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value.trim() === '') {
            setCenters(mockCenters);
        } else {
            const filtered = mockCenters.filter(c => 
                c.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                c.address.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setCenters(filtered);
        }
    };

    return (
        <div className="page page-container fade-in">
            <div style={{ maxWidth: '800px', width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Header Section */}
                <div style={{ textAlign: 'left', paddingLeft: '0.5rem', marginBottom: '1.5rem' }}>
                    <h1 style={{ fontSize: '2rem', color: 'var(--heading-color)', fontWeight: '700', margin: '0 0 0.5rem 0', lineHeight: '1.2', paddingBottom: '0.2rem' }}>
                        Nearby Disposal Centers
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0, fontWeight: '500' }}>
                        Find authorized recycling and waste collection hubs near you.
                    </p>
                </div>

                {/* Location Detection & Search */}
                <div className="info-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', width: '100%' }}>
                        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
                            <input 
                                type="text" 
                                placeholder="Search by area or center name..." 
                                value={searchQuery}
                                onChange={handleSearch}
                                style={{ paddingLeft: '2.8rem' }}
                            />
                            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </span>
                        </div>
                        <button 
                            onClick={handleDetectLocation} 
                            className="btn-secondary"
                            disabled={loading}
                            style={{ whiteSpace: 'nowrap', gap: '0.5rem' }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            {loading ? 'Detecting...' : (locationDetected ? 'Location Detected' : 'Use Current Location')}
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: '0.8rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                        {['All', 'Plastic', 'Metal', 'Paper', 'E-waste', 'Organic', 'Hazardous'].map(type => (
                            <button 
                                key={type}
                                style={{ 
                                    padding: '0.5rem 1.2rem', 
                                    borderRadius: '20px', 
                                    border: '1px solid var(--border-color)', 
                                    background: type === 'All' ? 'var(--accent-green)' : 'var(--sidebar-bg)',
                                    color: type === 'All' ? '#ffffff' : 'var(--text-secondary)',
                                    fontSize: '0.85rem',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Free Drop-off Note */}
                <div style={{ 
                    background: 'var(--card-bg)', 
                    border: '1px solid var(--accent-green)', 
                    borderRadius: '12px', 
                    padding: '1rem 1.5rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    color: 'var(--accent-green)',
                    fontWeight: '500'
                }}>
                    <span style={{ fontSize: '1.5rem' }}>💡</span>
                    <p style={{ margin: 0 }}>Self drop-off is free or cheaper compared to pickup services.</p>
                </div>

                {/* Centers List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {centers.length > 0 ? centers.map(center => (
                        <div key={center.id} className="info-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                            {/* Left Side: Basic Info */}
                            <div style={{ flex: '1 1 300px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-primary)' }}>{center.name}</h3>
                                    <span style={{ 
                                        padding: '0.3rem 0.8rem', 
                                        borderRadius: '20px', 
                                        fontSize: '0.8rem', 
                                        fontWeight: '700',
                                        background: center.isOpen ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                        color: center.isOpen ? 'var(--accent-green)' : '#ef4444'
                                    }}>
                                        {center.status}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-green)', fontWeight: '600', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    {center.distance}
                                </div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                    <strong style={{ color: 'var(--text-primary)' }}>Address:</strong> {center.address}
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    {center.wasteTypes.map(type => (
                                        <span key={type} style={{ background: 'var(--sidebar-bg)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}>
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: Actions */}
                            <div style={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', gap: '0.8rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '1.5rem', justifyContent: 'center' }}>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                    <div style={{ fontWeight: '600', marginBottom: '0.2rem' }}>Contact Center:</div>
                                    <div style={{ color: 'var(--accent-green)', fontWeight: '700' }}>{center.contact}</div>
                                </div>
                                <a 
                                    href={center.mapsLink} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="btn-secondary"
                                    style={{ background: 'var(--sidebar-bg)', color: 'var(--accent-green)', border: '1px solid var(--accent-green)', boxShadow: 'none' }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
                                    Open in Maps
                                </a>
                            </div>
                        </div>
                    )) : (
                        <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            <p>No centers found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
