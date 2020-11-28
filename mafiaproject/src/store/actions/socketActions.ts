import { setIndexSocket, setRoomSocket, setGamesSocket, setMessage } from '../types';

const openTheSocket = async (dispatch, url, type) => {
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

export const getIndexSocket = (dispatch) => {
    return async () => {
        const url = 'ws:localhost:5000/init';
        const type = setIndexSocket;
        openTheSocket(dispatch, url, type);
    };
};

export const getRoomSocket = (dispatch, id) => {
    return async () => {
        const url = `ws:localhost:5000/room/${id}`;
        const type = setRoomSocket;
        openTheSocket(dispatch, url, type);
    };
};

export const getGamesSocket = (dispatch) => {
    return async () => {
        const url = 'ws:localhost:5000/game';
        const type = setGamesSocket;
        openTheSocket(dispatch, url, type);
    };
};
