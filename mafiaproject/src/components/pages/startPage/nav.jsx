import React from 'react';
import { Link } from 'react-router-dom';
import paths from '../../../constants/paths';
import './nav.scss';

const Nav = () => {
    const { createGame, games, auth } = paths;

    return (
        <div className="game_nav_wrapper">
            <Link to={createGame} className="game_nav">
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
