import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Auth = () => {
    const [value, setValue] = useState('');
    const [complete, setComplete] = useState(false);
    const id = useSelector((state) => state.socket.id);

    const inputHandler = (e) => setValue(e.target.value);
    const clickHandler = () => {
        if (value.length > 2) {
            localStorage.setItem('playerName', value);
            setComplete(true);
        }
    };
    const where = id === null ? '/' : `/room/${id}`;
    const toRender = complete ? (
        <Redirect to={where} />
    ) : (
        <>
            <input type="text" placeholder="введите имя" onInput={inputHandler} />
            <button type="button" onClick={clickHandler}>
                Подтвердить
            </button>
        </>
    );
    return toRender;
};

export default Auth;
