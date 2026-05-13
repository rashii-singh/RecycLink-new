import React, { useEffect, useState } from 'react'
import { LoadScript, GoogleMap, Marker, InfoWindow, Circle } from '@react-google-maps/api'

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export default function ThresholdPage() {
    const [clusters, setClusters] = useState([])
    const [mapError, setMapError] = useState(false)
    const [activeMarker, setActiveMarker] = useState(null)
    const [loading, setLoading] = useState(true)

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const mapContainerStyle = {
        width: '100%',
        height: '500px',
        borderRadius: '24px',
    }
    const defaultCenter = {
        lat: 12.9716, // Bangalore
        lng: 77.5946
    }

    useEffect(() => {
        window.gm_authFailure = () => setMapError(true);

        window.gm_authFailure = () => setMapError(true);

        const loadData = () => {
            const stored = JSON.parse(localStorage.getItem('pickupRequests') || '[]');
            const rawData = stored.map(docData => {
                return {
                    id: docData.id || Math.random().toString(),
                    latitude: docData.location?.latitude || docData.latitude,
                    longitude: docData.location?.longitude || docData.longitude,
                }
            }).filter(r => r.latitude && r.longitude);

            const processedClusters = [];
            const visited = new Set();

            rawData.forEach((req) => {
                if (visited.has(req.id)) return;

                const nearby = rawData.filter(other => {
                    if (visited.has(other.id)) return false;
                    const dist = calculateDistance(req.latitude, req.longitude, other.latitude, other.longitude);
                    return dist <= 1.0; 
                });

                if (nearby.length > 0) {
                    nearby.forEach(n => visited.add(n.id));
                    const avgLat = nearby.reduce((sum, n) => sum + n.latitude, 0) / nearby.length;
                    const avgLng = nearby.reduce((sum, n) => sum + n.longitude, 0) / nearby.length;

                    processedClusters.push({
                        id: `cluster-${req.id}`,
                        latitude: avgLat,
                        longitude: avgLng,
                        count: nearby.length,
                        isHighDemand: nearby.length >= 5
                    });
                }
            });

            setClusters(processedClusters)
            setLoading(false)
        };
        
        loadData();
        const interval = setInterval(loadData, 5000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="page fade-in" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}>
            <div style={{ marginBottom: '3rem', textAlign: 'left' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--heading-color)', fontWeight: '800', margin: '0 0 0.5rem 0', letterSpacing: '-0.03em' }}>
                    Location-Based Pickup Insights
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', margin: 0, fontWeight: '500' }}>
                    Visualize pickup demand and identify high-demand zones in your area
                </p>
            </div>

            <div className="info-card" style={{
                background: 'var(--card-bg)',
                borderRadius: '24px',
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                marginBottom: '2rem',
                textAlign: 'left',
                border: '1px solid var(--border-color)'
            }}>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontWeight: '700', fontSize: '1.4rem' }}>Zone Threshold Status</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                    Our AI groups pickup requests within a 1km radius to optimize collection routes.
                    Areas with <strong style={{ color: '#ef4444' }}>5 or more</strong> active requests are automatically flagged as High Demand Zones for priority dispatch.
                </p>
            </div>

            <div className="map-card" style={{
                width: '100%',
                background: 'var(--card-bg)',
                borderRadius: '24px',
                padding: '1.5rem',
                boxShadow: '0 15px 40px rgba(0,0,0,0.06)',
                border: '1px solid var(--border-color)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: '700' }}>Demand Map Legend</h3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            color: '#ef4444',
                            padding: '0.4rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                        }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
                            🔴 High Demand
                        </div>
                        <div style={{
                            background: 'rgba(34, 197, 94, 0.15)',
                            color: 'var(--accent-green)',
                            padding: '0.4rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.4rem'
                        }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-green)' }}></span>
                            🟢 Normal
                        </div>
                    </div>
                </div>

                {(!apiKey || mapError) ? (
                    <div className="civic-message" style={{ background: '#F9FAFB', color: '#6B7280', border: '1px dashed #D1D5DB', padding: '6rem', borderRadius: '16px' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
                        Map unavailable in demo mode
                    </div>
                ) : (
                    <LoadScript googleMapsApiKey={apiKey} onError={() => setMapError(true)}>
                        <GoogleMap mapContainerStyle={mapContainerStyle} center={defaultCenter} zoom={11} onClick={() => setActiveMarker(null)}>
                            {clusters.map(cluster => (
                                <React.Fragment key={cluster.id}>
                                    <Marker
                                        position={{ lat: cluster.latitude, lng: cluster.longitude }}
                                        onClick={() => setActiveMarker(cluster.id)}
                                        icon={cluster.isHighDemand ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}
                                    >
                                        {activeMarker === cluster.id && (
                                            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                                <div style={{ color: '#1F2937', padding: '8px', minWidth: '160px', textAlign: 'left' }}>
                                                    <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: cluster.isHighDemand ? '#dc2626' : '#16a34a' }}>
                                                        {cluster.isHighDemand ? '🔥 Priority Zone' : '✅ Standard Zone'}
                                                    </h4>
                                                    <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '6px', marginTop: '6px' }}>
                                                        <p style={{ margin: 0, fontSize: '13px', color: '#4B5563' }}>Requests: <strong style={{ color: '#111827' }}>{cluster.count}</strong></p>
                                                        <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#9CA3AF', fontWeight: '600', textTransform: 'uppercase' }}>
                                                            {cluster.isHighDemand ? 'High Priority' : 'Normal Schedule'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </InfoWindow>
                                        )}
                                    </Marker>
                                    {cluster.isHighDemand && (
                                        <Circle
                                            center={{ lat: cluster.latitude, lng: cluster.longitude }}
                                            radius={1000}
                                            options={{ fillColor: '#dc2626', fillOpacity: 0.12, strokeColor: '#dc2626', strokeOpacity: 0.3, strokeWeight: 1 }}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </GoogleMap>
                    </LoadScript>
                )}
            </div>
        </div>
    )
}
