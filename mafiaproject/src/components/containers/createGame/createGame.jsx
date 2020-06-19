import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { sendGameName } from '../../../store/actions';
import './createGame.scss';

const CreateGame = () => {
    const [value, setValue] = useState('');
    const [canCreate, setCanCreate] = useState(false);
    const [readyToplay, setReadyToPlay] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (value.length > 3) setCanCreate(true);
        else setCanCreate(false);
    }, [value]);
    const gameUrl = `/room/${uuidv4()}`;
    const inputHandler = (e) => setValue(e.target.value);
    const clickHandler = () => {
        dispatch(sendGameName(value));
        setReadyToPlay(true);
    };

    const toRender = readyToplay ? (
        <Redirect to={gameUrl} />
    ) : (
        <>
            <input type="text" placeholder="введите название" onInput={inputHandler} />
            <button type="submit" disabled={!canCreate} onClick={clickHandler}>
                Создать игру
            </button>
        </>
    );
    return toRender;
};
export default CreateGame;
