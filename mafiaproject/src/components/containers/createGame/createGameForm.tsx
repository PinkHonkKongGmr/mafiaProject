import React from 'react';
import InputButton from '../../forms/inputButton';

const CreateGameForm = ({ onGameNameSend, onChange, canCreate }) => {
    return (
        <InputButton
            onFinish={onGameNameSend}
            buttonDisabled={!canCreate}
            gridType="a"
            text="Создать комнату"
            onChange={onChange}
        />
    );
};

export default CreateGameForm;
