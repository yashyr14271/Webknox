import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Check if user is logged in
    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const { data } = await api.get('/auth/me');
                if (data.success) {
                    setUser(data.data);
                } else {
                    setUser(null);
                }
            } catch (err) {
                setUser(null);
                // Don't log 401 errors as they are expected when not logged in
            } finally {
                setLoading(false);
            }
        };

        checkUserLoggedIn();
    }, [refreshTrigger]);

    // Login
    const login = async (userData) => {
        const res = await api.post('/auth/login', userData);
        if (res.data.success) {
            // Force re-fetch of user
            setRefreshTrigger(prev => prev + 1);
            return res.data;
        }
    };

    // Signup
    const signup = async (userData) => {
        const res = await api.post('/auth/signup', userData);
        if (res.data.success) {
            setRefreshTrigger(prev => prev + 1);
            return res.data;
        }
    };

    // Logout
    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
