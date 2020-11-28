import React from 'react';
import { Link } from 'react-router-dom';

const GamesList = ({ games }) => {
    const gameList = games.map((game) => {
        return (
            <div key={game.id}>
                <Link to={`/room/${game.id}`}>{game.name}</Link>
            </div>
        );
    });

    return (
        <div className="gamelist">
            <h2 style={{ color: 'yellowgreen' }}>Список доступных игр:</h2>
            {gameList.lenght ? { gameList } : <div style={{ color: 'yellow' }}>Игр пока нет, создайте свою</div>}
        </div>
    );
};

export default GamesList;
