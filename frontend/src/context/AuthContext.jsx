import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mock auth initialization
    useEffect(() => {
        const storedUser = localStorage.getItem('demo_user');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        // Ensure userData contains role, default to 'user'
        const updatedUser = { ...userData, role: userData.role || 'user' };
        setCurrentUser(updatedUser);
        localStorage.setItem('demo_user', JSON.stringify(updatedUser));
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('demo_user');
    };

    const value = {
        currentUser,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
