import React, { useState, useEffect } from 'react';
import GamesList from './gamesList';

const GamesStore = ({ gamesSocket }) => {
    const [games, setGames] = useState<any>(null);
    useEffect(() => {
        gamesSocket.send('give me games');
        gamesSocket.onmessage = (event) => {
            const games = JSON.parse(event.data);
            setGames(games);
        };
    }, [gamesSocket]);

    if (games) {
        return <GamesList games={games}></GamesList>;
    }
    return <div style={{ color: 'yellowgreen' }}>...loading</div>;
};

export default GamesStore;
