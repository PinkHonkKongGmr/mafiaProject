import { setIndexSocket, setRoomSocket, setMessage, setId, sendNameOfTheGame, getGameSocket } from './types';

export const getSocket = (dispatch, socketType: string, id) => {
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

export const getGameSocketAction = (dispatch) => {
    return async () => {
        const gameSocketPromise = new Promise((res) => {
            const socket = new WebSocket('ws:localhost:5000/game');
            res(socket);
        });
        try {
            const gameSocket = await gameSocketPromise;
            dispatch({ type: getGameSocket, payLoad: gameSocket });
        } catch (e) {
            dispatch({ type: setMessage, payLoad: 'something broken' });
        }
    };
};
