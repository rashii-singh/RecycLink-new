import React from 'react';
import { useLocationContext } from '../context/LocationContext';
import { useTheme } from '../context/ThemeContext';

export default function LiveMap() {
    const { selectedLoc } = useLocationContext();
    const { theme } = useTheme();

    // Default to Bangalore if no location is selected
    const lat = selectedLoc?.lat || 12.9716;
    const lng = selectedLoc?.lng || 77.5946;

    // Calculate bounding box for OpenStreetMap iframe
    // 0.02 degrees offset provides a good city-level zoom
    const offset = 0.02;
    const bbox = `${lng - offset},${lat - offset},${lng + offset},${lat + offset}`;
    
    // Add a marker at the exact location
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;

    // Apply a dark mode CSS filter if the app is in dark theme
    const filterStyle = theme === 'dark' ? { filter: 'invert(90%) hue-rotate(180deg)' } : {};

    return (
        <div style={{ 
            borderRadius: '12px', 
            overflow: 'hidden', 
            border: '1px solid var(--border-color)', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            height: '350px',
            width: '100%',
            background: 'var(--card-bg)'
        }}>
            <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src={mapUrl} 
                style={{ border: 'none', width: '100%', height: '100%', ...filterStyle }} 
                title="Live Location Map"
            ></iframe>
        </div>
    );
}
