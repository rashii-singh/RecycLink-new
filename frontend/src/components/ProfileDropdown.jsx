import { useNavigate } from 'react-router-dom';
import ProfileAvatar from './ProfileAvatar';
import { useLanguage } from '../context/LanguageContext';

export default function ProfileDropdown({ user, onLogout, closeDropdown }) {
    const navigate = useNavigate();
    const { language, changeLanguage, t } = useLanguage();

    const handleNavigation = (path) => {
        navigate(path);
        closeDropdown();
    };

    const handleLogout = () => {
        onLogout();
        closeDropdown();
    };

    if (!user) return null;

    return (
        <div className="profile-dropdown">
            <div className="dropdown-header" onClick={() => handleNavigation('/profile')}>
                <ProfileAvatar user={user} size={50} />
                <div className="dropdown-user-info">
                    <span className="dropdown-name">{user.displayName || 'Eco Warrior'}</span>
                    <span className="dropdown-email">{user.email}</span>
                </div>
            </div>
            
            <div className="dropdown-divider"></div>
            
            <div className="dropdown-item" style={{ cursor: 'default' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🌐 {t('Language')}
                </span>
                <select 
                    className="lang-select" 
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                >
                    <option value="en">English</option>
                    <option value="kn">ಕನ್ನಡ (Kannada)</option>
                    <option value="hi">हिंदी (Hindi)</option>
                </select>
            </div>

            <button className="dropdown-item" onClick={() => handleNavigation('/settings')}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ⚙️ {t('Settings')}
                </span>
            </button>

            <div className="dropdown-divider"></div>

            <button className="dropdown-item logout" onClick={handleLogout}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🔓 {t('Logout')}
                </span>
            </button>
        </div>
    );
}
