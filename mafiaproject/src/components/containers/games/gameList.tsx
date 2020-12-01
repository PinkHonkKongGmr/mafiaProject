import React from 'react';

const GameList = ({ gameList }) => (
    <div className="gamelist">
        <h2 style={{ color: 'yellowgreen' }}>Список доступных игр:</h2>
        {gameList.length ? gameList : <div style={{ color: 'yellow' }}>Игр пока нет, создайте свою</div>}
    </div>
);

export default GameList;
