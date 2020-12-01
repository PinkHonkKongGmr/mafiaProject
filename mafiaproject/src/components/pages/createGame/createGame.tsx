import React, { useState, useEffect, useCallback } from 'react';
import CreateGameForm from './createGameForm';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { sendGameName } from '../../../store/actions';
import './createGame.scss';

const CreateGame = () => {
    const [canCreate, setCanCreate] = useState(false);
    const [value, setValue] = useState('');
    const [readyToplay, setReadyToPlay] = useState(false);
    const dispatch = useDispatch();
    const gameUrl = `/room/${uuidv4()}`;

    useEffect(() => {
        if (value.length > 3) {
            setCanCreate(true);
        }
        if (value.length < 4) {
            setCanCreate(false);
        }
    }, [value]);

    onchange = useCallback(
        (e) => {
            setValue(e.target.value);
        },
        [value]
    );

    const onGameNameSend = ({ message }) => {
        dispatch(sendGameName(message));
        setReadyToPlay(true);
    };

    const toRender = readyToplay ? (
        <Redirect to={gameUrl} />
    ) : (
        <CreateGameForm onGameNameSend={onGameNameSend} canCreate={canCreate} onChange={onchange} />
    );
    return toRender;
};
export default CreateGame;
