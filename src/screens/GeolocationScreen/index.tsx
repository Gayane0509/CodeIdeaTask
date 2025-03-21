import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, PermissionsAndroid, AppState, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { Container, LocationContainer } from '../../components/Container';
import { Label, ErrorText, InfoText, PermissionText } from '../../components/Label';
import { StyledButton, PermissionButton } from '../../components/Button';
import { PLATFORM } from '../../enums/enums';

const GeolocationScreen: React.FC = () => {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
    const [permissionDenied, setPermissionDenied] = useState<boolean>(false);

    const requestPermission = async () => {
        if (Platform.OS === PLATFORM.ANDROID) {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'We need access to your location.',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setPermissionGranted(true);
                    setPermissionDenied(false);
                } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
                    setPermissionGranted(false);
                    setPermissionDenied(false);
                } else {
                    setPermissionGranted(false);
                    setPermissionDenied(true);
                }
            } catch (err) {
                console.warn(err);
                setPermissionGranted(false);
                setPermissionDenied(true);
            }
        } else if (Platform.OS === PLATFORM.IOS) {
            Geolocation.requestAuthorization();
            setPermissionGranted(true);
            setPermissionDenied(false);
        }
    };

    useEffect(() => {
        requestPermission();

        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') {
                requestPermission();
            }
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const getLocation = () => {
        if (!permissionGranted) {
            setError('Location permission is required.');
            return;
        }

        setLoading(true);

        Geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                setError(null);
                setLoading(false);
            },
            (err) => {
                if (Platform.OS === PLATFORM.IOS && err.code === 1) {
                    setError('Location access is disabled. Please enable it in Settings.');
                } else {
                    setError(err.message);
                }
                setLocation(null);
                setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const openSettings = () => {
        Linking.openSettings().catch((err) => console.error('Error opening settings:', err));
    };

    return (
        <Container>
            <Label>Geolocation Screen</Label>

            {permissionGranted === null ? (
                <InfoText>Requesting permission...</InfoText>
            ) : !permissionGranted ? (
                <>
                    <InfoText>Permission is required to access your location.</InfoText>
                    {permissionDenied ? (
                        <>
                            <ErrorText>Permission denied permanently. Please enable it in your settings.</ErrorText>
                            <PermissionButton onPress={openSettings}>
                                <PermissionText>Go to settings to enable permission</PermissionText>
                            </PermissionButton>
                        </>
                    ) : (
                        <PermissionButton onPress={requestPermission}>
                            <PermissionText>Tap here to request permission again.</PermissionText>
                        </PermissionButton>
                    )}
                </>
            ) : (
                <>
                    <StyledButton title="Get My Location" onPress={getLocation} disabled={loading} />

                    {loading ? (
                        <ActivityIndicator size="large" />
                    ) : location ? (
                        <LocationContainer>
                            <InfoText>Latitude: {location.latitude}</InfoText>
                            <InfoText>Longitude: {location.longitude}</InfoText>
                        </LocationContainer>
                    ) : (
                        <InfoText>No location available</InfoText>
                    )}
                    {error && <ErrorText>{`Error: ${error}`}</ErrorText>}

                </>
            )}
        </Container>
    );
};

export default GeolocationScreen;
