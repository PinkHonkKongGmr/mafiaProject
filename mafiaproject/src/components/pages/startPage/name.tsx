import React, { useEffect, useState } from 'react';
import './name.scss';

type NameProps = {
    name: string;
};

const Name: React.FC<NameProps> = ({ name }) => {
    const [color, setColor] = useState('');
    const [change, setChange] = useState(0);
    useEffect(() => {
        const clasess = ['nickname_pack1', 'nickname_pack2'];
        const colorClass = clasess[Math.floor(Math.random() * clasess.length)];
        setColor(colorClass);
        setChange(change + 1);
    }, []);
    useEffect(() => {
        setTimeout(() => {
            const clasess = ['nickname_pack1', 'nickname_pack2'];
            const colorClass = clasess[Math.floor(Math.random() * clasess.length)];
            setColor(colorClass);
            setChange(change + 1);
        }, 4000);
    }, [change]);

    return (
        <>
            <span className={color}>{name}</span>
            <span className="welcome_pack3">, добро пожаловать!</span>
        </>
    );
};

export default Name;
