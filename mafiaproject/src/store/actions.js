import { setIndexSocket, setRoomSocket, setMessage, setId } from './types';

const createPromiseResovedSocket = (url) =>
    new Promise((res) => {
        const socket = new WebSocket(url);
        res(socket);
    });

export const getSocket = (dispatch, socketType, id) => {
    return async () => {
        const url = socketType === 'index' ? 'ws:localhost:5000' : `ws:localhost:5000/room/${id}`;
        const type = socketType === 'index' ? setIndexSocket : setRoomSocket;
        const indexSocketPromise = createPromiseResovedSocket(url);
        try {
            const socket = await indexSocketPromise;
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
