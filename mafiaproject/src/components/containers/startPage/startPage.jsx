import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const StartPage = () => {
    const name = localStorage.getItem('playerName');
    const newUrl = `/createGame`;
    const games = '/games';
    const auth = '/auth';
    const toRender =
        name === null ? (
            <Redirect to={auth} />
        ) : (
            <>
                <h3>{name}, добро пожаловать!</h3>
                <Link to={newUrl}>Cоздать игру</Link>
                <Link to={games}>Присоединиться к игре</Link>
                <Link to={auth}>Поменять имя</Link>
            </>
        );
    return toRender;
};

export default StartPage;
