import React from 'react';

export default function DustbinCard({ color, label, description, icon }) {
    // Determine dynamic accent colors based on the `color` prop
    const getColorStyles = (c) => {
        const normalized = c.toLowerCase();
        switch (normalized) {
            case 'blue': // Dry Waste
                return { bg: '#eff6ff', border: '#3b82f6', text: '#1e3a8a', iconColor: '#3b82f6' };
            case 'green': // Wet Waste
                return { bg: '#f0fdf4', border: '#22c55e', text: '#14532d', iconColor: '#22c55e' };
            case 'red': // Hazardous / Reject
                return { bg: '#fef2f2', border: '#ef4444', text: '#7f1d1d', iconColor: '#ef4444' };
            case 'yellow': // Bio-medical
                return { bg: '#fefce8', border: '#eab308', text: '#713f12', iconColor: '#eab308' };
            case 'black':
            case 'gray':
            case 'grey': // E-Waste
                return { bg: '#f3f4f6', border: '#6b7280', text: '#1f2937', iconColor: '#4b5563' };
            default:
                // Fallback for custom hex codes
                return { bg: `${c}15`, border: c, text: '#1f2937', iconColor: c };
        }
    };

    const styles = getColorStyles(color);

    return (
        <div 
            style={{
                background: styles.bg,
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                border: `2px solid ${styles.border}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.8rem',
                transition: 'transform 0.2s ease',
                width: '100%',
                cursor: 'pointer',
                textAlign: 'center'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#ffffff',
                color: styles.iconColor,
                fontSize: '2rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
                {icon}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <h3 style={{ 
                    margin: 0, 
                    fontSize: '1rem', 
                    color: styles.text,
                    fontWeight: '800',
                    textTransform: 'uppercase'
                }}>
                    {label}
                </h3>
                <p style={{ 
                    margin: 0, 
                    fontSize: '0.8rem', 
                    color: styles.text,
                    opacity: 0.8,
                    lineHeight: '1.4'
                }}>
                    {description}
                </p>
            </div>
        </div>
    );
}
