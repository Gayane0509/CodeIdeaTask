import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const Navigation = () => {
    const { isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            setIsLoading(false);
        };
        checkLoginStatus();
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};

export default Navigation;
