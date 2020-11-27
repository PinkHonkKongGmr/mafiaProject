import React from 'react';
import ChatForm from './chatForm';

const name = localStorage.getItem('playerName');

const ChatFormStore = ({ roomSocket }) => {
    const onMessageSend = ({ message }) => {
        const messageData = JSON.stringify({
            service: false,
            name,
            message,
        });
        roomSocket.send(messageData);
    };

    return <ChatForm onMessageSend={onMessageSend} />;
};

export default ChatFormStore;
