import { setIndexSocket, setRoomSocket, setMessage, setId, sendNameOfTheGame, getGames } from './types';

export const getSocket = (dispatch, socketType, id) => {
    return async () => {
        const url = socketType === 'index' ? 'ws:localhost:5000/init' : `ws:localhost:5000/room/${id}`;
        const type = socketType === 'index' ? setIndexSocket : setRoomSocket;
        const socketPromise = new Promise((res) => {
            const socket = new WebSocket(url);
            res(socket);
        });
        try {
            const socket = await socketPromise;
            dispatch({ type, payLoad: socket });
        } catch (e) {
            dispatch({ type: setMessage, payLoad: 'something broken' });
        }
    };
};

export const getId = (id) => ({
    type: setId,
    payLoad: id,
});

export const getMessages = (data) => ({
    type: setMessage,
    payLoad: data,
});

export const sendGameName = (name) => {
    return {
        type: sendNameOfTheGame,
        payLoad: name,
    };
};

export const getGameList = (dispatch) => {
    return async () => {
        const gamesPromise = new Promise((res) => {
            const socket = new WebSocket('ws:localhost:5000/game');
            let games = null;
            const interval = setInterval(() => {
                if (socket.readyState !== 0) {
                    socket.send('give me games');

                    socket.onmessage = (event) => {
                        games = JSON.parse(event.data);
                    };
                    if (games !== null) {
                        res(games);
                        clearInterval(interval);
                    }
                }
            });
        });
        try {
            const game = await gamesPromise;
            dispatch({ type: getGames, payLoad: game });
        } catch (e) {
            dispatch({ type: setMessage, payLoad: 'something broken' });
        }
    };
};
