import React, { useState } from 'react';
import GamesStore from './gamesStore';
import useGetSocket from '../../../socketHooks/useGetSocket';
import sockets from '../../../constants/socketConstants';
import Loader from '../../loaders/loader';
import './games.scss';

const Games = () => {
    const [gamesSocket, setGamesSocket] = useState<any>(null);
    const { games } = sockets;
    useGetSocket(games).then((rs) => {
        setTimeout(() => {
            setGamesSocket(rs);
        }, 600);
    });

    if (gamesSocket) {
        return (
            <>
                <GamesStore gamesSocket={gamesSocket} />
            </>
        );
    }
    return <Loader />;
};

export default Games;
