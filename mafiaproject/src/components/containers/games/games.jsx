import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getGameSocketAction } from '../../../store/actions';
import './games.scss';

const Games = () => {
    const dispatch = useDispatch();
    const gameSocket = useSelector((state) => state.game.gameSocket);
    const [games, setGames] = useState(null);
    useEffect(() => {
        getGameSocketAction(dispatch)();
    }, []);
    useEffect(() => {
        if (gameSocket) {
            const interval = setInterval(() => {
                if (gameSocket.readyState !== 0) {
                    clearInterval(interval);
                    gameSocket.send('give me games');
                    gameSocket.onmessage = (event) => {
                        console.log('send');
                        const games = JSON.parse(event.data);
                        setGames(games);
                    };
                }
            });
        }
    }, [gameSocket]);

    const gameList = games
        ? games.map((game) => {
              return (
                  <div key={game.id}>
                      <Link to={`/room/${game.id}`}>{game.name}</Link>
                  </div>
              );
          })
        : 'нет созданных игр, создайте свою';

    return (
        <div className="gamelist">
            <h2>Список доступных игр:</h2>
            {gameList}
        </div>
    );
};

export default Games;
