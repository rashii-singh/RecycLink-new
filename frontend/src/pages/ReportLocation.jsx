import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReportLocation() {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [locationText, setLocationText] = useState('');
    const [detectingLocation, setDetectingLocation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const cameraRef = React.useRef();
    const galleryRef = React.useRef();

    const detectLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser');
            return;
        }
        setDetectingLocation(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();
                    
                    if (data && data.address) {
                        const addr = data.address;
                        const premise = addr.amenity || addr.building || '';
                        const route = addr.road || '';
                        const sublocality = addr.suburb || addr.neighbourhood || '';
                        const locality = addr.city || addr.town || addr.village || addr.state_district || '';
                        const pincode = addr.postcode || '';
                        
                        const nameParts = [];
                        if (premise) nameParts.push(premise);
                        if (route) nameParts.push(route);
                        if (sublocality && !nameParts.includes(sublocality)) nameParts.push(sublocality);
                        if (locality && !nameParts.includes(locality)) nameParts.push(locality);
                        if (pincode) nameParts.push(pincode);
                        
                        const finalName = nameParts.length > 0 ? nameParts.join(', ') : data.display_name;
                        setLocationText(finalName || `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
                    } else {
                        setLocationText(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
                    }
                } catch (err) {
                    console.error('Error fetching geocoding data:', err);
                    setLocationText(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
                } finally {
                    setDetectingLocation(false);
                }
            },
            (error) => {
                alert('Unable to retrieve your location');
                setDetectingLocation(false);
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description || !image || !phoneNumber || !locationText) {
            alert("Please provide an image, description, phone number, and location.");
            return;
        }

        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSuccess(true);
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (error) {
            console.error("Error submitting report:", error);
            alert("Failed to submit report. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page page-container fade-in" style={{ maxWidth: '600px' }}>
            <div style={{ textAlign: 'left', paddingLeft: '0.5rem', marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', color: 'var(--heading-color)', fontWeight: '700', margin: '0 0 0.5rem 0', lineHeight: '1.2', paddingBottom: '0.2rem' }}>
                    Report a Location
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0, fontWeight: '500' }}>
                    Help us keep the city clean by reporting illegal dumping zones.
                </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Upload Image */}
                <div className="info-card" style={{ background: 'var(--card-bg)', borderRadius: '20px', padding: '1.25rem', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ margin: '0 0 1rem 0' }}>Upload Photo</h3>
                    
                    {image ? (
                        <div style={{ position: 'relative', marginBottom: '1rem' }}>
                            <img src={URL.createObjectURL(image)} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '12px' }} />
                            <button type="button" onClick={() => setImage(null)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                        </div>
                    ) : (
                        <div style={{ padding: '2rem', borderRadius: '12px', border: '2px dashed var(--border-color)', textAlign: 'center', background: 'var(--sidebar-bg)' }}>
                            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>📸</span>
                            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <button type="button" className="button" style={{ padding: '0.8rem 1.5rem', flex: 1, minWidth: '120px' }} onClick={() => cameraRef.current.click()}>Open Camera</button>
                                <button type="button" className="button" style={{ padding: '0.8rem 1.5rem', flex: 1, minWidth: '120px', background: 'var(--bg-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }} onClick={() => galleryRef.current.click()}>Gallery / Files</button>
                            </div>
                        </div>
                    )}
                    
                    <input 
                        ref={cameraRef}
                        type="file" 
                        accept="image/*"
                        capture="environment"
                        onChange={(e) => setImage(e.target.files[0])}
                        style={{ display: 'none' }}
                    />
                    <input 
                        ref={galleryRef}
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        style={{ display: 'none' }}
                    />
                </div>

                {/* Description & Details */}
                <div className="info-card" style={{ background: 'var(--card-bg)', borderRadius: '20px', padding: '1.25rem', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ margin: '0 0 1rem 0' }}>Location & Contact Details</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input 
                                type="text" 
                                placeholder="Enter location manually or detect..."
                                value={locationText}
                                onChange={(e) => setLocationText(e.target.value)}
                                style={{ padding: '1rem', borderRadius: '12px', border: '2px solid var(--border-color)', fontSize: '1rem', outline: 'none', background: 'var(--sidebar-bg)', color: 'var(--text-primary)', flex: 1 }}
                            />
                            <button 
                                type="button" 
                                onClick={detectLocation} 
                                disabled={detectingLocation}
                                style={{ padding: '0 1.5rem', borderRadius: '12px', border: 'none', background: 'var(--accent-blue)', color: 'white', fontWeight: 'bold', cursor: 'pointer', opacity: detectingLocation ? 0.7 : 1 }}
                            >
                                {detectingLocation ? '📍...' : '📍 Detect'}
                            </button>
                        </div>

                        <textarea 
                            placeholder="Provide details about the location, landmarks, and severity..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ padding: '1rem', borderRadius: '12px', border: '2px solid var(--border-color)', fontSize: '1rem', outline: 'none', background: 'var(--sidebar-bg)', color: 'var(--text-primary)', width: '100%', minHeight: '100px', resize: 'vertical' }}
                        />

                        <input 
                            type="tel" 
                            placeholder="Your Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            style={{ padding: '1rem', borderRadius: '12px', border: '2px solid var(--border-color)', fontSize: '1rem', outline: 'none', background: 'var(--sidebar-bg)', color: 'var(--text-primary)', width: '100%' }}
                        />

                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', marginTop: '0.5rem', padding: '1rem', background: 'rgba(220, 38, 38, 0.08)', borderRadius: '12px', borderLeft: '4px solid #dc2626' }}>
                            <span style={{ fontSize: '1.2rem', marginTop: '-2px' }}>⚠️</span>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                                <strong>Warning:</strong> By submitting this report, you confirm its authenticity. If someone misuses this feature for false reporting, they will have to pay a money penalty.
                            </p>
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
                        <h2 style={{ fontSize: '1.75rem', color: 'var(--accent-green)', margin: 0, background: 'none', webkitTextFillColor: 'initial', lineHeight: '1.2' }}>Report Submitted!</h2>
                        <p style={{ color: 'var(--text-secondary)', fontWeight: '500', fontSize: '0.9rem' }}>Thank you for your contribution. Authorities will review it shortly.</p>
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
                    {loading ? 'Submitting...' : success ? 'Submitted Successfully ✅' : 'Submit Report 🧹'}
                </button>
            </form>
        </div>
    );
}
