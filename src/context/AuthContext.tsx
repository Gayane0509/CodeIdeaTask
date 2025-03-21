import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as Keychain from 'react-native-keychain';

const AuthContext = createContext<any>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const checkToken = async () => {
            try {
                const credentials = await Keychain.getGenericPassword();
                setIsAuthenticated(!!(credentials && credentials.password));

            } catch (error) {
                console.error('Failed to load credentials from Keychain', error);
                setIsAuthenticated(false);
            }
        };

        checkToken();
    }, []);

    const login = async () => {
        try {
            const accessToken = Math.random().toString(36).substring(2, 15);
            await Keychain.setGenericPassword('accessToken', accessToken);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Failed to store credentials in Keychain', error);
        }
    };

    const logout = async () => {
        try {
            await Keychain.resetGenericPassword();
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Failed to reset credentials in Keychain', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
