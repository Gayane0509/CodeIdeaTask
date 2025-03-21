import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MessageScreen from '../screens/MessageScreen';
import GeolocationScreen from '../screens/GeolocationScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Message" component={MessageScreen} options={{ tabBarIcon: () => null }} />
            <Tab.Screen name="Geolocation" component={GeolocationScreen} options={{ tabBarIcon: () => null }} />
        </Tab.Navigator>
    );
};

export default AppNavigator;
