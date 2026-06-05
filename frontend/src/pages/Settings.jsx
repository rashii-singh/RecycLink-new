import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useLocationContext } from '../context/LocationContext';

export default function Settings() {
    const { language, changeLanguage, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const { selectedLoc, setSelectedLoc, PRESET_LOCATIONS } = useLocationContext();

    const [tempLoc, setTempLoc] = useState(selectedLoc);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [locationError, setLocationError] = useState(null);

    // Sync local state if context changes externally
    useEffect(() => {
        setTempLoc(selectedLoc);
    }, [selectedLoc]);

    const detectLocation = () => {
        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser.');
            return;
        }
        setLoadingLocation(true);
        setLocationError(null);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();
                    
                    if (data && data.address) {
                        const addr = data.address;
                        const premise = addr.amenity || addr.building || '';
                        const route = addr.road || '';
                        const sublocality = addr.suburb || addr.neighbourhood || '';
                        const locality = addr.city || addr.town || addr.village || addr.state_district || 'Unknown';
                        const pincode = addr.postcode || '';
                        
                        const nameParts = [];
                        if (premise) nameParts.push(premise);
                        if (route) nameParts.push(route);
                        if (sublocality && !nameParts.includes(sublocality)) nameParts.push(sublocality);
                        
                        if (nameParts.length === 0 && data.display_name) {
                            nameParts.push(data.display_name.split(',')[0]);
                        }
                        
                        const name = nameParts.join(', ');
                        let sub = locality;
                        if (pincode) {
                            sub += ` - ${pincode}`;
                        }
                        
                        setTempLoc({
                            name: name || 'Current Location',
                            sub: sub,
                            lat: latitude,
                            lng: longitude
                        });
                    } else {
                        setTempLoc({
                            name: 'Current Location',
                            sub: 'Unknown',
                            lat: latitude,
                            lng: longitude
                        });
                    }
                } catch (err) {
                    console.error('Error fetching geocoding data:', err);
                    setTempLoc({
                        name: 'Current Location',
                        sub: 'Unknown',
                        lat: latitude,
                        lng: longitude
                    });
                } finally {
                    setLoadingLocation(false);
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                let errMsg = 'Failed to detect location.';
                if (error.code === error.PERMISSION_DENIED) {
                    errMsg = 'Location permission denied. Please allow location access or select manually.';
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    errMsg = 'Location information is unavailable.';
                } else if (error.code === error.TIMEOUT) {
                    errMsg = 'Location request timed out.';
                }
                setLocationError(errMsg);
                setLoadingLocation(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    // Auto-detect location safely when settings page mounts
    useEffect(() => {
        detectLocation();
    }, []);

    return (
        <div className="page">
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .spin-icon {
                    animation: spin 1s linear infinite;
                }
            `}</style>

            <h2 className="page-title">⚙️ {t('Settings')}</h2>

            <div className="info-card">
                <h3 style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                    Preferences
                </h3>
                
                <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
                    <span className="info-label" style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{t('Language')}</span>
                    <select 
                        className="lang-select" 
                        value={language}
                        onChange={(e) => changeLanguage(e.target.value)}
                        style={{ 
                            padding: '0.8rem 2.5rem 0.8rem 1.2rem', 
                            borderRadius: '12px', 
                            border: '1px solid var(--border-color)', 
                            background: 'var(--card-bg)', 
                            color: 'var(--text-primary)', 
                            fontSize: '1rem', 
                            width: '220px', 
                            cursor: 'pointer',
                            appearance: 'none',
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='${theme === 'dark' ? '%234ade80' : '%23064e3b'}' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1.2rem center'
                        }}
                    >
                        <option value="en">English</option>
                        <option value="kn">ಕನ್ನಡ (Kannada)</option>
                        <option value="hi">हिंदी (Hindi)</option>
                    </select>
                </div>
                
                <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 0' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <span className="info-label" style={{ fontWeight: '600', color: 'var(--text-primary)' }}>App Theme</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Switch between light and dark mode</span>
                    </div>
                    <button 
                        onClick={toggleTheme}
                        style={{
                            padding: '0.8rem 1.5rem',
                            borderRadius: '12px',
                            background: theme === 'light' ? '#f1f5f9' : '#334155',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-primary)',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {theme === 'light' ? '☀️ Light' : '🌙 Dark'}
                    </button>
                </div>

                <div className="info-row" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem 0', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <span className="info-label" style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Default Location</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Used for localized waste collection services</span>
                    </div>
                    
                    <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ flex: 1, minWidth: '250px', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <select 
                                value={tempLoc.name}
                                onChange={(e) => {
                                    const preset = PRESET_LOCATIONS.find(l => l.name === e.target.value);
                                    if (preset) {
                                        setTempLoc(preset);
                                    }
                                }}
                                style={{ 
                                    flex: 1,
                                    padding: '0.8rem 1.2rem', 
                                    borderRadius: '12px', 
                                    border: '1px solid var(--border-color)', 
                                    background: 'var(--card-bg)', 
                                    color: 'var(--text-primary)', 
                                    fontSize: '1rem', 
                                    cursor: 'pointer'
                                }}
                            >
                                {/* If tempLoc is not in PRESET_LOCATIONS, display it as a custom option */}
                                {!PRESET_LOCATIONS.some(loc => loc.name === tempLoc.name) && (
                                    <option value={tempLoc.name}>
                                        {tempLoc.name.startsWith('Lat:') ? 'Current Location, Bangalore, KA' : `${tempLoc.name}, ${tempLoc.sub}`}
                                    </option>
                                )}
                                {PRESET_LOCATIONS.map(loc => (
                                    <option key={loc.name} value={loc.name}>{loc.name}, {loc.sub}</option>
                                ))}
                            </select>

                            <button 
                                type="button"
                                onClick={detectLocation}
                                disabled={loadingLocation}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '0.8rem',
                                    borderRadius: '12px',
                                    background: 'rgba(34, 197, 94, 0.15)',
                                    border: '1px solid var(--accent-green)',
                                    color: 'var(--accent-green)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    minWidth: '44px',
                                    minHeight: '44px'
                                }}
                                title="Use Current Location"
                            >
                                {loadingLocation ? (
                                    <svg className="spin-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="16"></circle>
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                )}
                            </button>
                        </div>
                        
                        <button 
                            className="btn-secondary" 
                            style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', height: '44px' }}
                            onClick={() => {
                                setSelectedLoc(tempLoc);
                                alert('Location updated successfully!');
                            }}
                        >
                            Save
                        </button>
                    </div>

                    {loadingLocation && (
                        <div style={{ fontSize: '0.85rem', color: 'var(--accent-green)', fontWeight: '600', marginTop: '0.2rem' }}>
                            Detecting location...
                        </div>
                    )}

                    {locationError && (
                        <div style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: '600', marginTop: '0.2rem' }}>
                            ⚠️ {locationError}
                        </div>
                    )}
                </div>
            </div>

            <div className="info-card">
                <h3 style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                    Account Management
                </h3>
                
                <div className="info-row">
                    <span className="info-label">Edit Profile</span>
                    <button className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Edit</button>
                </div>
                
                <div className="info-row">
                    <span className="info-label">Change Password</span>
                    <button className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Update</button>
                </div>
            </div>
        </div>
    );
}
