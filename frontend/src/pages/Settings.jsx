import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useLocationContext } from '../context/LocationContext';

export default function Settings() {
    const { language, changeLanguage, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const { selectedLoc, setSelectedLoc, PRESET_LOCATIONS } = useLocationContext();

    return (
        <div className="page">
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
                    
                    <div style={{ width: '100%', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <select 
                            value={selectedLoc.name}
                            onChange={(e) => {
                                const newLoc = PRESET_LOCATIONS.find(l => l.name === e.target.value);
                                if (newLoc) setSelectedLoc(newLoc);
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
                            {PRESET_LOCATIONS.map(loc => (
                                <option key={loc.name} value={loc.name}>{loc.name} ({loc.sub})</option>
                            ))}
                        </select>
                        <button 
                            className="btn-secondary" 
                            style={{ padding: '0.8rem 1.5rem', borderRadius: '12px' }}
                            onClick={() => alert('Location updated successfully!')}
                        >
                            Save
                        </button>
                    </div>
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
