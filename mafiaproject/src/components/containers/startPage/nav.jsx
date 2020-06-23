import React from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

const Nav = () => {
    const newUrl = `/createGame`;
    const games = '/games';
    const auth = '/auth';
    return (
        <div className="game_nav_wrapper">
            <Link to={newUrl} className="game_nav">
                Cоздать игру
            </Link>
            <Link to={games} className="game_nav">
                Присоединиться к игре
            </Link>
            <Link to={auth} className="game_nav">
                Поменять имя
            </Link>
        </div>
    );
};

export default Nav;
