import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BackButton() {
    const navigate = useNavigate();
    const location = useLocation();

    // Do not show on Home or Login
    if (location.pathname === '/' || location.pathname === '/login') return null;

    return (
        <button 
            onClick={() => navigate(-1)} 
            style={{
                position: 'fixed',
                top: '15px',
                left: '15px',
                zIndex: 1100,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--sidebar-bg)',
                color: 'var(--heading-color)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: '0',
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateX(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.12)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            }}
            title="Go Back"
        >
            <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ display: 'block' }}
            >
                <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
        </button>
    );
}
