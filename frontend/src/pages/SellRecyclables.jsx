import React, { useState } from 'react';

const RECYCLABLE_ITEMS = [
    { id: 'paper', name: 'Newspapers', icon: '📰', priceRange: '₹12-15/kg' },
    { id: 'cardboard', name: 'Cardboard', icon: '📦', priceRange: '₹8-10/kg' },
    { id: 'plastic', name: 'Plastic Bottles', icon: '🧴', priceRange: '₹10-12/kg' },
    { id: 'metal', name: 'Metal Scrap', icon: '🔩', priceRange: '₹20-25/kg' },
    { id: 'books', name: 'Old Books', icon: '📚', priceRange: '₹10-12/kg' },
    { id: 'glass', name: 'Glass Bottles', icon: '🍾', priceRange: '₹2-5/kg' },
];

const mockRequests = [
    {
        id: 'REQ-001',
        items: 'Newspapers & Cardboard',
        weight: '15 kg',
        estimatedPrice: '₹180 - ₹225',
        status: 'Pickup Scheduled',
        statusColor: '#22c55e',
        collectorName: 'Rajesh Kumar',
        collectorContact: '+91 98765 43210',
        pickupDate: 'Tomorrow, 10:00 AM',
    }
];

export default function SellRecyclables() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(null);
    const [requests, setRequests] = useState(mockRequests);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState('sell');
    const [cancellingReqId, setCancellingReqId] = useState(null);
    const [cancelReason, setCancelReason] = useState('');
    const [otherReason, setOtherReason] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const CANCEL_REASONS = [
        'Pickup delayed',
        'Wrong request placed',
        'Not available at pickup time',
        'Price issue',
        'Pickup no longer needed',
        'Other'
    ];

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate submission
        setTimeout(() => {
            const newReq = {
                id: `REQ-${Math.floor(Math.random() * 900) + 100}`,
                items: selectedItem ? RECYCLABLE_ITEMS.find(i => i.id === selectedItem).name : 'Recyclables',
                weight: `${quantity} kg`,
                estimatedPrice: 'Calculating...',
                status: 'Awaiting Collector',
                statusColor: '#f59e0b',
                collectorName: 'Finding nearby collector...',
                collectorContact: '-',
                pickupDate: 'Within 48 hours',
            };
            setRequests([newReq, ...requests]);
            setIsSubmitting(false);
            setActiveTab('history');
            setSelectedItem(null);
            setQuantity('');
            setImage(null);
        }, 1500);
    };

    const handleCancelConfirm = () => {
        setRequests(prev => prev.filter(r => r.id !== cancellingReqId));
        setCancellingReqId(null);
        setCancelReason('');
        setOtherReason('');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="page page-container fade-in" style={{ maxWidth: '900px' }}>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Header Section */}
                <div style={{ textAlign: 'left', paddingLeft: '0.5rem', marginBottom: '1.5rem' }}>
                    <h1 style={{ fontSize: '2rem', color: 'var(--heading-color)', fontWeight: '700', margin: '0 0 0.5rem 0', lineHeight: '1.2', paddingBottom: '0.2rem' }}>
                        Earn from Recyclables
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0, fontWeight: '500' }}>
                        Turn your household scrap into money and help the planet.
                    </p>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', background: 'var(--border-color)', padding: '0.4rem', borderRadius: '12px', width: 'fit-content', margin: '0 auto' }}>
                    <button 
                        onClick={() => setActiveTab('sell')}
                        style={{ 
                            padding: '0.6rem 1.5rem', 
                            borderRadius: '8px', 
                            border: 'none', 
                            background: activeTab === 'sell' ? 'var(--bg-color)' : 'transparent',
                            color: activeTab === 'sell' ? 'var(--accent-green)' : 'var(--text-secondary)',
                            fontWeight: '700',
                            cursor: 'pointer',
                            boxShadow: activeTab === 'sell' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                            transition: 'all 0.2s',
                            border: activeTab === 'sell' ? '1px solid var(--border-color)' : 'none'
                        }}
                    >
                        Sell Now
                    </button>
                    <button 
                        onClick={() => setActiveTab('history')}
                        style={{ 
                            padding: '0.6rem 1.5rem', 
                            borderRadius: '8px', 
                            border: 'none', 
                            background: activeTab === 'history' ? 'var(--bg-color)' : 'transparent',
                            color: activeTab === 'history' ? 'var(--accent-green)' : 'var(--text-secondary)',
                            fontWeight: '700',
                            cursor: 'pointer',
                            boxShadow: activeTab === 'history' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                            transition: 'all 0.2s',
                            border: activeTab === 'history' ? '1px solid var(--border-color)' : 'none'
                        }}
                    >
                        Pickup Requests
                    </button>
                </div>

                {activeTab === 'sell' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        
                        {/* Sell Form */}
                        <div className="info-card" style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>Book Scrap Pickup</h3>
                            
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {/* Item Type */}
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)' }}>What would you like to sell?</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '0.8rem' }}>
                                        {RECYCLABLE_ITEMS.map(item => (
                                            <div 
                                                key={item.id}
                                                onClick={() => setSelectedItem(item.id)}
                                                style={{
                                                    padding: '1rem 0.5rem',
                                                    borderRadius: '12px',
                                                    border: selectedItem === item.id ? '2px solid var(--accent-green)' : '1px solid var(--border-color)',
                                                    background: selectedItem === item.id ? 'var(--sidebar-bg)' : 'var(--bg-color)',
                                                    textAlign: 'center',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>{item.icon}</div>
                                                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)' }}>{item.name}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--accent-green)', fontWeight: '600' }}>{item.priceRange}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity */}
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Estimated Weight (kg)</label>
                                    <input 
                                        type="number" 
                                        placeholder="e.g. 10" 
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        required
                                        style={{ padding: '0.8rem 1rem' }}
                                    />
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Add Photos (Optional)</label>
                                    <div 
                                        onClick={() => document.getElementById('scrap-image').click()}
                                        style={{
                                            border: '2px dashed var(--border-color)',
                                            borderRadius: '12px',
                                            padding: '1.5rem',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            background: 'var(--sidebar-bg)',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseOver={e => e.currentTarget.style.borderColor = 'var(--accent-green)'}
                                        onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
                                    >
                                        {image ? (
                                            <img src={image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '120px', borderRadius: '8px' }} />
                                        ) : (
                                            <>
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.5rem' }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Click to upload scrap photos</div>
                                            </>
                                        )}
                                        <input type="file" id="scrap-image" hidden onChange={handleFileChange} />
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn-secondary" 
                                    disabled={isSubmitting || !selectedItem || !quantity}
                                    style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                                >
                                    {isSubmitting ? 'Processing...' : 'Request Free Pickup'}
                                </button>

                                <div style={{ textAlign: 'center' }}>
                                    <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>or </span>
                                    <button 
                                        type="button" 
                                        style={{ background: 'none', border: 'none', color: '#16a34a', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
                                        onClick={() => window.location.href='/disposal-centers'}
                                    >
                                        Visit Self Drop-off Center
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Price List & Info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="info-card" style={{ padding: '1.5rem', background: 'var(--card-bg)', border: '1px solid var(--accent-green)' }}>
                                <h4 style={{ color: 'var(--accent-green)', margin: '0 0 0.8rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                                    <span style={{ fontSize: '1.1rem' }}>💰</span> Why sell to RecycLink?
                                </h4>
                                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-primary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', margin: 0 }}>
                                    <li>Get the best market rates for your scrap.</li>
                                    <li>Doorstep pickup within 1-3 working days.</li>
                                    <li>Accurate digital weighing for fair pricing.</li>
                                    <li>Direct payment to your wallet or bank.</li>
                                </ul>
                            </div>

                            <div className="info-card" style={{ padding: '1.5rem' }}>
                                <h4 style={{ margin: '0 0 1rem 0' }}>Current Scrap Rates (approx)</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                                    {RECYCLABLE_ITEMS.slice(0, 5).map(item => (
                                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '0.4rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span>{item.icon}</span>
                                                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{item.name}</span>
                                            </div>
                                            <span style={{ color: '#16a34a', fontWeight: '700' }}>{item.priceRange}</span>
                                        </div>
                                    ))}
                                </div>
                                <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '1rem', fontStyle: 'italic' }}>* Rates may vary based on location and scrap quality.</p>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {requests.map(req => (
                            <div key={req.id} className="info-card" style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '700' }}>{req.id}</div>
                                        <h3 style={{ fontSize: '1.3rem', margin: '0.2rem 0', color: 'var(--text-primary)' }}>{req.items}</h3>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Weight: <span style={{ fontWeight: '700' }}>{req.weight}</span></div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ 
                                            background: req.statusColor + '20', 
                                            color: req.statusColor, 
                                            padding: '0.4rem 1rem', 
                                            borderRadius: '20px', 
                                            fontSize: '0.85rem', 
                                            fontWeight: '800',
                                            marginBottom: '0.5rem',
                                            display: 'inline-block'
                                        }}>
                                            {req.status}
                                        </div>
                                        <div style={{ color: '#16a34a', fontWeight: '800', fontSize: '1.1rem' }}>{req.estimatedPrice}</div>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', padding: '1.2rem', background: 'var(--sidebar-bg)', borderRadius: '12px' }}>
                                    <div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Collector Details</div>
                                        <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{req.collectorName}</div>
                                        <div style={{ color: 'var(--accent-green)', fontSize: '0.9rem', fontWeight: '600' }}>{req.collectorContact}</div>
                                    </div>
                                    <div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Expected Pickup</div>
                                        <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{req.pickupDate}</div>
                                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Code: <span style={{ color: 'var(--text-primary)', fontWeight: '800' }}>4298</span></div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        <button 
                                            className="btn-secondary" 
                                            onClick={() => setCancellingReqId(req.id)}
                                            style={{ background: 'var(--sidebar-bg)', color: '#ef4444', border: '1px solid var(--border-color)', padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
                                        >
                                            Cancel Request
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Success Message */}
                {showSuccess && (
                    <div style={{ position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', background: '#22c55e', color: 'white', padding: '1rem 2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 1000, fontWeight: '700' }} className="fade-in">
                        Request Cancelled Successfully ✅
                    </div>
                )}

                {/* Cancellation Modal */}
                {cancellingReqId && (
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
                        <div className="info-card" style={{ maxWidth: '450px', width: '90%', padding: '2rem', background: 'var(--card-bg)' }}>
                            <h2 style={{ marginBottom: '0.5rem' }}>Cancel Pickup?</h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Please select a reason for cancelling your request.</p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
                                {CANCEL_REASONS.map(reason => (
                                    <label key={reason} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--border-color)', cursor: 'pointer', background: cancelReason === reason ? 'var(--sidebar-bg)' : 'transparent', transition: 'all 0.2s' }}>
                                        <input 
                                            type="radio" 
                                            name="cancelReason" 
                                            value={reason} 
                                            checked={cancelReason === reason} 
                                            onChange={(e) => setCancelReason(e.target.value)}
                                            style={{ width: '18px', height: '18px', accentColor: 'var(--accent-green)' }}
                                        />
                                        <span style={{ fontWeight: '600', color: cancelReason === reason ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{reason}</span>
                                    </label>
                                ))}
                                
                                {cancelReason === 'Other' && (
                                    <textarea 
                                        placeholder="Please tell us more..." 
                                        value={otherReason}
                                        onChange={(e) => setOtherReason(e.target.value)}
                                        style={{ width: '100%', padding: '1rem', borderRadius: '10px', border: '1px solid var(--accent-green)', background: 'var(--sidebar-bg)', color: 'var(--text-primary)', marginTop: '0.5rem', minHeight: '80px', fontFamily: 'inherit' }}
                                    />
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button 
                                    className="btn-secondary" 
                                    onClick={() => { setCancellingReqId(null); setCancelReason(''); setOtherReason(''); }}
                                    style={{ flex: 1, background: 'var(--sidebar-bg)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
                                >
                                    Back
                                </button>
                                <button 
                                    className="btn-secondary" 
                                    disabled={!cancelReason || (cancelReason === 'Other' && !otherReason)}
                                    onClick={handleCancelConfirm}
                                    style={{ flex: 1, background: '#ef4444', border: 'none' }}
                                >
                                    Confirm Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
