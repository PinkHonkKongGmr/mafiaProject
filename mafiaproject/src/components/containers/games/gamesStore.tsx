import React, { useState, useEffect } from 'react';
import GamesListStore from './gamesListStore';
import Loading from '../../loaders/loading';

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
        return <GamesListStore games={games}></GamesListStore>;
    }
    return <Loading text="done" />;
};

export default GamesStore;
