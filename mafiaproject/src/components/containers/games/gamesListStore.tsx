import React from 'react';
import { Link } from 'react-router-dom';
import GameList from './gameList';

const GamesListStore = ({ games }) => {
    const gameList = games.map((game) => {
        return (
            <div key={game.id}>
                <Link to={`/room/${game.id}`}>{game.name}</Link>
            </div>
        );
    });

    return <GameList gameList={gameList} />;
};

export default GamesListStore;
