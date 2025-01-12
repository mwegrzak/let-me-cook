import React, { useContext, useState, createContext, useEffect } from 'react';
import { API_URL } from './utils/api';

const UserContext = createContext({ isLoggedIn: false, user: {}, toggleLogin: () => { } });
const UserUpdateContext = createContext()

export function useUser() {
    return useContext(UserContext)
}

export function useUpdateUser() {
    return useContext(UserUpdateContext)
}

export function UserProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    const toggleLogin = (userData) => {
        if (userData) {
            setUser(userData);
            setIsLoggedIn(true);
        } else {
            setUser({});
            setIsLoggedIn(false);
        }
    }


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${API_URL}/api/auth/check`, {
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const userData = await response.json();
                toggleLogin(userData);
            } catch (error) {
                console.error('Failed to fetch user:', error);
                toggleLogin();
            }
        };

        fetchUser();
    }, [])

    return (
        <UserContext.Provider value={{ isLoggedIn, user }}>
            <UserUpdateContext.Provider value={toggleLogin}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    )
}