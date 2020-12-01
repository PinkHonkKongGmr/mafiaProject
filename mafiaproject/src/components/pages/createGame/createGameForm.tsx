import React from 'react';
import InputButton from '../../forms/inputButton';
import { gridTypes } from '../../forms/inputButton/grid';

const CreateGameForm = ({ onGameNameSend, onChange, canCreate }) => {
    const { typeA } = gridTypes;
    return (
        <InputButton
            onFinish={onGameNameSend}
            buttonDisabled={!canCreate}
            gridType={typeA}
            text="Создать комнату"
            onChange={onChange}
        />
    );
};

export default CreateGameForm;
