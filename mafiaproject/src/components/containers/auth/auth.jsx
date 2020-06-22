import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Auth = () => {
    const [value, setValue] = useState('');
    const [complete, setComplete] = useState(false);

    const inputHandler = (e) => setValue(e.target.value);
    const clickHandler = () => {
        if (value.length > 2) {
            localStorage.setItem('playerName', value);
            setComplete(true);
        }
    };
    const startPage = '/';
    const toRender = complete ? (
        <Redirect to={startPage} />
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
