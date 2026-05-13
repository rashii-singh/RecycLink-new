import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm your Eco Assistant. How can I help you today? 🌱", isBot: true }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = (text) => {
        const msgText = typeof text === 'string' ? text : inputValue.trim();
        if (!msgText) return;

        setMessages(prev => [...prev, { text: msgText, isBot: false }]);
        setInputValue('');

        // Mock AI Response Logic
        setTimeout(() => {
            let botResponse = "I can help you with waste segregation and pickup! Ask me about plastic, organic waste, or how to use the app.";
            
            const lowerMsg = msgText.toLowerCase();
            if (lowerMsg.includes('plastic')) {
                botResponse = "Plastic should be rinsed and dried, then placed in the Blue (Dry Waste) bin. 🧴";
            } else if (lowerMsg.includes('organic') || lowerMsg.includes('food') || lowerMsg.includes('kitchen')) {
                botResponse = "Organic or wet waste like food scraps and peels should go into the Green bin for composting. 🌿";
            } else if (lowerMsg.includes('hazardous') || lowerMsg.includes('battery')) {
                botResponse = "Hazardous items like batteries and chemicals should be placed in the Red bin for special handling. ⚠️";
            } else if (lowerMsg.includes('medical')) {
                botResponse = "Medical waste like masks or bandages goes in the Yellow bin. 🏥";
            } else if (lowerMsg.includes('pickup') || lowerMsg.includes('map')) {
                botResponse = "You can view the 'Nearby Pickup Map' on your Dashboard to see active collectors and high-demand areas! 🗺️";
            } else if (lowerMsg.includes('guide') || lowerMsg.includes('dispose')) {
                botResponse = "Our 'Smart Disposal Guide' recommends: Blue for Recyclables, Green for Organic, Red for Hazardous, and Yellow for Medical. 📋";
            }

            setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
        }, 800);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="chatbot-container">
            {/* Chat Window */}
            {isOpen && (
                <div style={{
                    width: 'calc(100vw - 40px)',
                    maxWidth: '320px',
                    height: '480px',
                    maxHeight: '70vh',
                    backgroundColor: 'var(--card-bg)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '10px',
                    marginRight: '10px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    animation: 'slideUp 0.3s ease-out'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '1rem',
                        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span style={{ fontWeight: 'bold' }}>Eco Assistant 🌱</span>
                        <button 
                            onClick={() => setIsOpen(false)}
                            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.2rem' }}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages Container */}
                    <div style={{
                        flex: 1,
                        padding: '1rem',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.8rem',
                        background: 'var(--sidebar-bg)'
                    }}>
                        {messages.map((msg, index) => (
                            <div 
                                key={index}
                                style={{
                                    maxWidth: '85%',
                                    padding: '0.8rem',
                                    borderRadius: '12px',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.4',
                                    alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                                    backgroundColor: msg.isBot ? 'var(--card-bg)' : 'var(--accent-green)',
                                    color: msg.isBot ? 'var(--text-primary)' : '#ffffff',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                    border: msg.isBot ? '1px solid var(--border-color)' : 'none'
                                }}
                            >
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Features in Chat */}
                    <div style={{ padding: '0.5rem', background: 'var(--card-bg)', display: 'flex', gap: '0.5rem', overflowX: 'auto', borderTop: '1px solid var(--border-color)' }}>
                        <button onClick={() => handleSend("Tell me about the Smart Disposal Guide")} style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '12px', border: '1px solid var(--accent-green)', background: 'transparent', color: 'var(--accent-green)', whiteSpace: 'nowrap', cursor: 'pointer' }}>📋 Disposal Guide</button>
                        <button onClick={() => handleSend("Where is the Nearby Pickup Map?")} style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '12px', border: '1px solid var(--accent-green)', background: 'transparent', color: 'var(--accent-green)', whiteSpace: 'nowrap', cursor: 'pointer' }}>🗺️ Pickup Map</button>
                    </div>

                    {/* Input Area */}
                    <div style={{ padding: '0.8rem', borderTop: '1px solid var(--border-color)', background: 'var(--card-bg)', display: 'flex', gap: '0.5rem' }}>
                        <input 
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask something..."
                            style={{
                                flex: 1,
                                padding: '0.6rem 0.8rem',
                                borderRadius: '20px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--sidebar-bg)',
                                color: 'var(--text-primary)',
                                outline: 'none',
                                fontSize: '0.9rem'
                            }}
                        />
                        <button 
                            onClick={() => handleSend()}
                            style={{
                                width: '35px',
                                height: '35px',
                                borderRadius: '50%',
                                backgroundColor: '#22c55e',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'transparent',
                    color: 'white',
                    border: 'none',
                    fontSize: '1.8rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    position: 'fixed',
                    bottom: '100px',
                    right: '15px',
                    zIndex: 1000
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                {isOpen ? '✕' : (
                    <svg width="45" height="45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                        <defs>
                            <linearGradient id="outerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#22C55E" />
                                <stop offset="100%" stopColor="#1D4ED8" />
                            </linearGradient>
                            <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                                <feOffset dx="1" dy="1" />
                                <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0" />
                            </filter>
                        </defs>
                        
                        {/* Outer Gradient Bubble with tail */}
                        <path 
                            d="M 50 10 C 27.9 10 10 27.9 10 50 C 10 58.5 12.6 66.4 17.1 72.9 L 10 90 L 28.5 83.5 C 34.8 87.6 42.1 90 50 90 C 72.1 90 90 72.1 90 50 C 90 27.9 72.1 10 50 10 Z" 
                            fill="url(#outerGrad)" 
                        />
                        
                        {/* Inner White Bubble */}
                        <g transform="translate(50, 48)">
                            {/* Antenna */}
                            <rect x="-1.5" y="-38" width="3" height="10" rx="1.5" fill="white" />
                            <circle cx="0" cy="-38" r="3.5" fill="white" />
                            
                            {/* Bubble Body */}
                            <path 
                                d="M 0 -28 C -16.6 -28 -30 -16.4 -30 -2 C -30 5.4 -27.3 12.1 -22.8 17.5 L -28 30 L -14 25 C -9.8 28.1 -4.7 30 0 30 C 16.6 30 30 18.4 30 4 C 30 -10.4 16.6 -28 0 -28 Z" 
                                fill="white" 
                            />
                            
                            {/* Three dots with specific colors from reference */}
                            <circle cx="-12" cy="4" r="4" fill="#22C55E" />
                            <circle cx="0" cy="4" r="4" fill="#0EA5E9" />
                            <circle cx="12" cy="4" r="4" fill="#2563eb" />
                        </g>
                    </svg>
                )}
            </button>

            <style>
                {`
                    @keyframes slideUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}
            </style>
        </div>
    );
}
