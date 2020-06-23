import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getGameList } from '../../../store/actions';
import './games.scss';

const Games = () => {
    const dispatch = useDispatch();
    const games = useSelector((state) => state.game.games);
    useEffect(() => {
        getGameList(dispatch)();
    }, []);
    useEffect(() => {}, [games]);
    const gameList = games.length
        ? games.map((game) => {
              return (
                  <div key={uuidv4()}>
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
