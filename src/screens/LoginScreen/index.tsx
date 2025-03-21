import React, { useState } from 'react';
import { Alert } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { StyledButton } from '../../components/Button';
import { Container } from '../../components/Container';
import { StyledTextInput } from '../../components/Input';
import { Label } from '../../components/Label';
import { useAuth } from '../../context/AuthContext';

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const { login } = useAuth();

    const generateAccessToken = (): string => {
        return Math.random().toString(36).slice(2);
    };

    const validateEmail = (email: string): boolean => {
        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegEx.test(email);
    };

    const handleLogin = async () => {
        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            Alert.alert('Error', 'Fill in the email, please');
            return;
        }

        if (!validateEmail(trimmedEmail)) {
            Alert.alert('Error', 'Enter a valid email, please');
            return;
        }

        try {
            const accessToken = generateAccessToken();
            await Keychain.setGenericPassword('accessToken', accessToken);
            login();

        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <Container>
            <Label>Login</Label>
            <StyledTextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <StyledButton title="Login" onPress={handleLogin} />
        </Container>
    );
};

export default LoginScreen;
