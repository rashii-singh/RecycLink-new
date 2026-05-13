import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UploadBox from '../components/UploadBox'
import ResultCard from '../components/ResultCard'
import { useLanguage } from '../context/LanguageContext'
import { WASTE_MAPPING } from '../constants/wasteMapping'

const CATEGORY_DATA = [
    {
        id: 'wet',
        title: 'Wet Waste',
        bgColor: '#2b9348',
        description: 'Food leftovers, vegetable peels and other biodegradable waste.',
        icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1.5 2 2 4.5 2 9 0 5-4.5 9-10 9z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>,
        modalIcon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1.5 2 2 4.5 2 9 0 5-4.5 9-10 9z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>,
        items: ['Food leftovers', 'Vegetable and fruit peels', 'Meat and bones', 'Tea leaves and coffee grounds', 'Garden waste'],
        dustbinColor: 'Green',
        dustbinHex: '#2b9348',
        dustbinInstruction: 'Wet waste should be kept in the green dustbin for proper composting.'
    },
    {
        id: 'dry',
        title: 'Dry Waste',
        bgColor: '#1d4ed8',
        description: 'Plastic, paper, glass and metal.',
        icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
        modalIcon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
        items: ['Plastic bottles', 'Paper and cardboard', 'Glass bottles and jars', 'Metal cans and containers', 'Old clothes and textiles'],
        dustbinColor: 'Blue',
        dustbinHex: '#1d4ed8',
        dustbinInstruction: 'Dry waste should be kept in the blue dustbin for proper recycling.'
    },
    {
        id: 'sanitary',
        title: 'Sanitary Waste',
        bgColor: '#dc2626',
        description: 'Diapers, sanitary napkins and similar waste.',
        icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M12 10v6"></path><path d="M9 13h6"></path></svg>,
        modalIcon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M12 10v6"></path><path d="M9 13h6"></path></svg>,
        items: ['Diapers', 'Sanitary napkins', 'Used bandages and cotton', 'Used tissues', 'Condoms'],
        dustbinColor: 'Red',
        dustbinHex: '#dc2626',
        dustbinInstruction: 'Sanitary waste should be kept in the red dustbin wrapped securely in paper.'
    },
    {
        id: 'hazardous',
        title: 'Hazardous Waste',
        bgColor: '#262626',
        description: 'Bulbs, medicines, paint and e-waste.',
        icon: <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
        modalIcon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
        items: ['Tube lights and bulbs', 'Expired medicines', 'Paint cans and chemicals', 'Batteries', 'E-waste (broken electronics)'],
        dustbinColor: 'Black',
        dustbinHex: '#262626',
        dustbinInstruction: 'Hazardous waste should be kept in the black dustbin for safe specialized disposal.'
    }
];

const CategoryCard = ({ category, onClick }) => {
    return (
        <div
            onClick={() => onClick(category)}
            className="guide-card"
            style={{
                background: category.bgColor,
                borderRadius: '12px',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                color: 'white',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
            onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
        >
            <div style={{ marginBottom: '0.5rem' }}>{category.icon}</div>
            <h4 style={{ fontSize: '1.25rem', margin: '0', fontWeight: '700' }}>{category.title}</h4>
            <p style={{ opacity: 0.9, fontSize: '0.9rem', margin: 0, fontWeight: '500', lineHeight: '1.4' }}>{category.description}</p>
        </div>
    )
}

export default function Home() {
    const { t } = useLanguage()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleUpload = async (image) => {
        setLoading(true)
        setResult(null) // Clear previous result before starting new prediction
        try {
            // Send image to backend for prediction
            const formData = new FormData();
            formData.append('file', image);

            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Prediction failed with status: ${response.status}`);
            }

            const data = await response.json();
            console.log("LOG: API response", data);

            let detectedType = data.category || 'Trash';
            detectedType = String(detectedType).trim();

            // Find case-insensitive match from WASTE_MAPPING keys
            const matchedKey = Object.keys(WASTE_MAPPING).find(
                key => key.toLowerCase() === detectedType.toLowerCase()
            ) || 'Trash';

            const details = WASTE_MAPPING[matchedKey] || WASTE_MAPPING['Trash'];

            console.log("LOG: Frontend Request - Sent file", image.name);
            console.log("LOG: Backend Response - Predicted Class ->", detectedType, "| Confidence ->", data.confidence);
            console.log("LOG: Mapping Selected ->", matchedKey);

            const updatedResult = {
                category: matchedKey,
                confidence: data.confidence,
                timestamp: new Date().toISOString(),
                imageUrl: URL.createObjectURL(image),
                explanation: details.explanation,
                instructions: details.instructions,
                eco_tip: details.ecoTip,
                color: details.hex,
                bin_color: details.color,
                bin_type: details.binType
            };

            console.log("LOG: updated prediction state", updatedResult);
            setResult(updatedResult);
        } catch (error) {
            console.error('Processing failed:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="home-container fade-in">
            <div className="hero-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', textAlign: 'center', marginBottom: '1rem' }}>
                <h1 className="hero-title" style={{ fontSize: '3.5rem', margin: 0, fontWeight: '800', letterSpacing: '-0.05em', lineHeight: '1.1', color: 'var(--text-primary)' }}>Recycle Smart, Live Green</h1>
                <h2 className="hero-feature-title" style={{ fontSize: '2.8rem', color: 'var(--accent-green)', fontWeight: '800', margin: '0.5rem 0 0.2rem 0', letterSpacing: '-0.03em', textTransform: 'capitalize' }}>AI Waste Detection</h2>
                <p className="hero-subtitle" style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0.8rem auto 0', lineHeight: '1.6', fontWeight: '500' }}>
                    Smarter waste segregation and optimized collection powered by real-time data and AI
                </p>
            </div>

            <div className="upload-wrapper">
                <UploadBox onUpload={handleUpload} loading={loading} />

                {result && (
                    <div className="result-wrapper fade-in-up">
                        <ResultCard result={result} />
                    </div>
                )}
            </div>

            {!result && !loading && (
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '3rem' }}>
                    {/* Waste Segregation Guide Section */}
                    <div className="guide-section fade-in-up" style={{ width: '100%', marginTop: '1rem' }}>
                        <h3 style={{ color: 'var(--heading-color)', fontSize: '1.8rem', textAlign: 'center', marginBottom: '2.5rem', fontWeight: '800' }}>Waste Segregation Guide</h3>
                        <div className="guide-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: '1.5rem',
                            width: '100%',
                            maxWidth: '1000px',
                            margin: '0 auto'
                        }}>
                            {CATEGORY_DATA.map(cat => (
                                <CategoryCard key={cat.id} category={cat} onClick={setSelectedCategory} />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Popup */}
            {selectedCategory && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '1rem'
                    }}
                    onClick={() => setSelectedCategory(null)}
                >
                    <div
                        style={{
                            background: 'var(--bg-color)',
                            borderRadius: '16px',
                            width: '100%',
                            maxWidth: '650px',
                            padding: '2.5rem',
                            position: 'relative',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            display: 'flex',
                            flexDirection: 'column',
                            animation: 'fade-in-up 0.3s ease-out',
                            border: '1px solid var(--card-border)'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedCategory(null)}
                            style={{
                                position: 'absolute', top: '1.2rem', right: '1.2rem',
                                background: 'transparent', border: 'none',
                                fontSize: '1.5rem', cursor: 'pointer',
                                color: '#9ca3af', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                padding: '0.5rem', borderRadius: '50%'
                            }}
                            onMouseOver={e => e.currentTarget.style.background = '#f3f4f6'}
                            onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                        >
                            ✕
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: selectedCategory.dustbinHex, marginBottom: '2rem' }}>
                            <div style={{ width: '32px', height: '32px' }}>{selectedCategory.modalIcon}</div>
                            <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: '800' }}>{selectedCategory.title}</h2>
                        </div>

                        <div style={{ display: 'flex', gap: '2.5rem' }}>
                            <div style={{ flex: 1, borderRight: '2px solid var(--border-color)', paddingRight: '2.5rem' }}>
                                <h3 style={{ fontSize: '1rem', margin: '0 0 1rem 0', color: 'var(--text-primary)', fontWeight: '700' }}>Items include:</h3>
                                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    {selectedCategory.items.map((item, i) => (
                                        <li key={i} style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '1rem' }}>
                                <h3 style={{ fontSize: '1.1rem', margin: 0, color: selectedCategory.dustbinHex, fontWeight: '800' }}>Use {selectedCategory.dustbinColor} Dustbin</h3>
                                <svg width="70" height="90" viewBox="0 0 24 24" fill={selectedCategory.dustbinHex} xmlns="http://www.w3.org/2000/svg">
                                    {/* Bin Lid */}
                                    <path d="M2 6h20v2H2z" fill={selectedCategory.dustbinHex} />
                                    <path d="M8 4h8v2H8z" fill={selectedCategory.dustbinHex} />
                                    {/* Bin Body */}
                                    <path d="M4 8h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z" fill={selectedCategory.dustbinHex} />
                                    {/* Recycle symbol inside */}
                                    <path d="M12 11l-2 3h4l-2-3zm-2.5 3.5l-1 2 2 1 1-2-2-1zm5 0l-2 1 1 2 2-1-1-2z" fill="white" />
                                </svg>
                                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                    {selectedCategory.dustbinInstruction}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}