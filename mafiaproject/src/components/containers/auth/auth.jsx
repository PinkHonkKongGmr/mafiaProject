import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Switch } from 'antd';
import Reg from './reg.jsx';

const Auth = () => {
    const [value, setValue] = useState('');
    const [complete, setComplete] = useState(false);
    const [isReg, setIsReg] = useState(true);
    const id = useSelector((state) => state.socket.id);

    const inputHandler = (e) => setValue(e.target.value);
    const clickHandler = () => {
        if (value.length > 2) {
            localStorage.setItem('playerName', value);
            setComplete(true);
        }
    };
    const onChange = (checked) => {
        setIsReg(checked);
    };
    const regOrNotString = isReg ? 'Зарегестрироваться' : 'Без регестрации';
    const where = id === null ? '/' : `/room/${id}`;
    const toRender = complete ? (
        <Redirect to={where} />
    ) : (
        <>
            <div>
                <Switch defaultChecked onChange={onChange} />
            </div>
            <div style={{ color: 'pink' }}>{regOrNotString}</div>
            {isReg && <Reg />}
            {!isReg && (
                <div>
                    <input type="text" placeholder="введите имя" onInput={inputHandler} />
                    <button type="button" onClick={clickHandler}>
                        Подтвердить
                    </button>
                </div>
            )}
        </>
    );
    return toRender;
};

export default Auth;
