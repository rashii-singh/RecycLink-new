import React from 'react';

export default function ProfileAvatar({ user, onClick, size = 40 }) {
    if (!user) return null;

    const getInitials = () => {
        if (user.displayName) {
            return user.displayName.charAt(0).toUpperCase();
        }
        if (user.email) {
            return user.email.charAt(0).toUpperCase();
        }
        return '?';
    };

    return (
        <div 
            className="profile-avatar" 
            onClick={onClick}
            style={{ width: size, height: size, fontSize: size * 0.4 }}
        >
            {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" />
            ) : (
                getInitials()
            )}
        </div>
    );
}
