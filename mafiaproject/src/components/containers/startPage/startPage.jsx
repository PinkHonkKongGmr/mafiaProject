import React from 'react';
import { Link } from 'react-router-dom';

const StartPage = () => {
    const newUrl = `/createGame`;
    const games = '/games';
    return (
        <>
            <Link to={newUrl}>Cоздать игру</Link>
            <Link to={games}>Присоединиться к игре</Link>
        </>
    );
};

export default StartPage;
