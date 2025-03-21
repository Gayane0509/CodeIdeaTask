import { NativeModules } from 'react-native';

interface MessageModule {
    sendMessage: (message: string, callback: (response: string) => void) => void;
}

const { MessageModule } = NativeModules as { MessageModule: MessageModule };

const sendMessage = (message: string): Promise<string> => {
    return new Promise((resolve) => {
        MessageModule.sendMessage(message, (response: string) => {
            resolve(response);
        });
    });
};

export default { sendMessage };
