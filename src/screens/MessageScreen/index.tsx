import React, { useState } from 'react';
import MessageModule from '../../nativeModules/MessageModule';
import { Container } from '../../components/Container';
import { InfoText, Label, PermissionText } from '../../components/Label';
import { StyledTextInput } from '../../components/Input';
import { LogOutButton, StyledButton } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';

const MessageScreen: React.FC = () => {
    const { logout } = useAuth();
    const [message, setMessage] = useState<string>('');
    const [response, setResponse] = useState<string>('');

    const handleSendMessage = async () => {
        try {
            const result = await MessageModule.sendMessage(message);
            setResponse(result);
        } catch (error) {
            setResponse('Error sending message');
        }
    };

    const handleLogout = async () => {
        await logout();
    };

    return (
        <Container>
            <Label>Message Screen</Label>
            <StyledTextInput
                placeholder="Type a message"
                value={message}
                onChangeText={setMessage}
            />
            <StyledButton title="Send Message" onPress={handleSendMessage} />

            {response ? <InfoText>{response}</InfoText> : null}

            <LogOutButton onPress={handleLogout}>
                <PermissionText>Log Out</PermissionText>
            </LogOutButton>
        </Container>
    );
};

export default MessageScreen;
