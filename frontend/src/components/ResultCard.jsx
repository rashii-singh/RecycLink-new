import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const categoryColors = {
    plastic: '#3b82f6',
    organic: '#22c55e',
    paper: '#f59e0b',
    metal: '#6b7280',
    ewaste: '#ef4444',
}

const categoryEmojis = {
    plastic: '🧴',
    organic: '🌿',
    paper: '📄',
    metal: '🔩',
    ewaste: '💻',
}

export default function ResultCard({ result }) {
    console.log("LOG: rendered result component", result);

    const [requesting, setRequesting] = useState(false);
    const [requestSuccess, setRequestSuccess] = useState(false);

    const category = result.category?.toLowerCase() || 'unknown'
    const color = categoryColors[category] || '#22c55e'
    const emoji = categoryEmojis[category] || '♻️'
    const confidence = Math.round((result.confidence || 0) * 100)

    const binHexColors = {
        blue: '#3b82f6',
        green: '#22c55e',
        yellow: '#eab308',
        red: '#ef4444',
        black: '#374151'
    };
    const binThemeColor = result.bin_color ? (binHexColors[result.bin_color.toLowerCase()] || color) : color;

    const handleRequestPickup = () => {
        setRequesting(true);

        const fallbackCoords = { latitude: 12.9716, longitude: 77.5946 };

        const saveToMock = async (lat, lng) => {
            try {
                // Mock saving to local storage
                const existing = JSON.parse(localStorage.getItem('pickupRequests') || '[]');
                const newReq = {
                    id: Math.random().toString(36).substring(7),
                    category: result.category || 'unknown',
                    location: { latitude: lat, longitude: lng },
                    timestamp: new Date().toISOString(),
                    status: 'Pending'
                };
                localStorage.setItem('pickupRequests', JSON.stringify([...existing, newReq]));
            } catch (error) {
                console.error("Storage error:", error);
            } finally {
                setRequesting(false);
                setRequestSuccess(true);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    saveToMock(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.warn("Geolocation denied or error, using fallback coords.", error);
                    saveToMock(fallbackCoords.latitude, fallbackCoords.longitude);
                }
            );
        } else {
            saveToMock(fallbackCoords.latitude, fallbackCoords.longitude);
        }
    };

    const { t } = useLanguage();

    return (
        <div className="result-card">
            <div className="category-badge" style={{ backgroundColor: color }}>
                {emoji} {result.category}
            </div>
            <div className="confidence-section">
                <p>Confidence</p>
                <div className="confidence-bar">
                    <div className="confidence-fill"
                        style={{ width: `${confidence}%`, backgroundColor: color }}>
                    </div>
                </div>
                <span>{confidence}%</span>
            </div>

            {result.bin_color && (
                <div style={{ marginTop: '1rem', padding: '0.8rem', borderRadius: '12px', border: `2px solid ${binThemeColor}`, background: `${binThemeColor}08`, textAlign: 'center', animation: 'pulse 2s infinite' }}>
                    <span style={{ fontWeight: '900', color: binThemeColor, fontSize: '1.1rem', letterSpacing: '1px' }}>
                        🗑️ USE {result.bin_color.toUpperCase()} DUSTBIN
                    </span>
                    {result.bin_type && (
                        <div style={{ color: binThemeColor, fontSize: '0.9rem', fontWeight: '700', marginTop: '0.2rem', opacity: 0.8 }}>
                            ({result.bin_type})
                        </div>
                    )}
                </div>
            )}
            
            {result.explanation && (
                <div className="explanation" style={{ marginTop: '1rem', padding: '1rem', background: 'var(--sidebar-bg)', borderRadius: '8px', borderLeft: `4px solid ${color}`, border: '1px solid var(--border-color)', borderLeftWidth: '4px' }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: 'var(--text-primary)' }}>🧠 AI Analysis</h3>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{result.explanation}</p>
                </div>
            )}

            <div className="instructions">
                <h3>📋 Disposal Instructions</h3>
                <p>{result.instructions || 'Dispose responsibly.'}</p>
            </div>
            <div className="eco-tip">
                <span>🌍 Eco Tip</span>
                <p>{result.eco_tip || 'Every correct disposal counts!'}</p>
            </div>

            <div className="pickup-section" style={{ marginTop: '1.5rem', borderTop: '1.5px dashed #cbd5e1', paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
                {requestSuccess ? (
                    <div className="success-message" style={{ color: '#16a34a', fontWeight: '800', textAlign: 'center', background: '#dcfce7', padding: '1rem', borderRadius: '12px' }}>
                        ✅ Pickup request submitted successfully
                    </div>
                ) : (
                    <button
                        style={{ 
                            width: '100%', 
                            background: requesting ? '#15803d' : '#16a34a', 
                            color: 'white',
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            gap: '0.8rem',
                            padding: '1.2rem',
                            borderRadius: '12px',
                            border: 'none',
                            fontSize: '1.15rem',
                            fontWeight: '800',
                            boxShadow: '0 4px 15px rgba(22, 163, 74, 0.3)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                        onClick={handleRequestPickup}
                        disabled={requesting}
                        onMouseEnter={(e) => { if (!requesting) e.currentTarget.style.background = '#15803d' }}
                        onMouseLeave={(e) => { if (!requesting) e.currentTarget.style.background = '#16a34a' }}
                    >
                        {requesting ? (
                            <>
                                <span className="spinner" style={{ width: '22px', height: '22px', borderWidth: '3px', borderColor: '#ffffff', borderTopColor: 'transparent' }}></span>
                                Processing...
                            </>
                        ) : (
                            <>
                                <span style={{ fontSize: '1.5rem' }}>🚚</span>
                                {t('Request Pickup')}
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}