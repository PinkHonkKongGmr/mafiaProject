import React from 'react';
import InputButton from '../../forms/inputButton';

const ChatForm = ({ onMessageSend }) => {
    return (
        <InputButton
            onFinish={onMessageSend}
            buttonDisabled={false}
            gridType="a"
            text="отправить"
            onChange={() => {}}
        />
    );
};

export default ChatForm;
