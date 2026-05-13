import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Help() {
    const { t } = useLanguage();

    return (
        <div className="page">
            <h2 className="page-title">❓ {t('Help')}</h2>

            <div className="info-card">
                <h3 style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>
                    Frequently Asked Questions
                </h3>
                
                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: '700' }}>How does the AI waste analysis work?</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        Simply upload an image of your waste item on the Home page. Our AI model will process the image to identify the material and provide proper disposal instructions.
                    </p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: '700' }}>How do I request a pickup?</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        After analyzing an image, click the "Request Pickup" button. Your location will be saved securely, and our community network will be notified.
                    </p>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: '700' }}>What is an Eco Score?</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        Your Eco Score represents your total positive environmental impact based on the items you have successfully segregated and recycled.
                    </p>
                </div>
            </div>

            <div className="info-card" style={{ alignItems: 'center', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontWeight: '800' }}>Need more support?</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                    For any additional inquiries or technical support, please contact us directly:
                </p>
                <a href="mailto:recyclink.support@gmail.com" style={{ color: '#16a34a', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1rem', textDecoration: 'none' }}>
                    recyclink.support@gmail.com
                </a>
            </div>
        </div>
    );
}
