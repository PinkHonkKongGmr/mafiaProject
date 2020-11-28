import React, { useState } from 'react';
import GamesStore from './gamesStore';
import useGetSocket from '../../../socketHooks/useGetSocket';
import './games.scss';

const Games = () => {
    const [gamesSocket, setGamesSocket] = useState<any>(null);
    useGetSocket('games').then((rs) => {
        setGamesSocket(rs);
    });

    if (gamesSocket) {
        return (
            <>
                <GamesStore gamesSocket={gamesSocket} />
            </>
        );
    }
    return <div>...loading</div>;
};

export default Games;
