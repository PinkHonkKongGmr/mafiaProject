import React from 'react';
import ChatForm from './chatForm';

const name = localStorage.getItem('playerName');

const ChatFormStore = ({ roomSocket }) => {
    const onMessageSend = ({ message }) => {
        const interval = setInterval(() => {
            if (roomSocket !== null) {
                if (roomSocket.readyState !== 0) {
                    const messageData = JSON.stringify({
                        service: false,
                        name,
                        message,
                    });
                    roomSocket.send(messageData);
                    clearInterval(interval);
                }
            }
        });
    };

    return <ChatForm onMessageSend={onMessageSend} />;
};

export default ChatFormStore;
