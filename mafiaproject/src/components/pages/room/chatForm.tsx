import React from 'react';
import InputButton from '../../forms/inputButton';
import { gridTypes } from '../../forms/inputButton/grid';

const ChatForm = ({ onMessageSend }) => {
    const { typeA } = gridTypes;
    return (
        <InputButton
            onFinish={onMessageSend}
            buttonDisabled={false}
            gridType={typeA}
            text="отправить"
            onChange={() => {}}
        />
    );
};

export default ChatForm;
