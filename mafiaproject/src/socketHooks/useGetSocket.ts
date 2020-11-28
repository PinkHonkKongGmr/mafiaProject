import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../store/types/rootState';
import { getIndexSocket, getRoomSocket, getGamesSocket } from '../store/actions/socketActions';
import sockets from '../constants/socketConstants';

const useGetSocket = (type: string) => {
    const dispatch = useDispatch();
    const id = useSelector<rootState, any>((state) => state.game.id);
    const { index, room, games } = sockets;

    useEffect(() => {
        switch (type) {
            case index:
                getIndexSocket(dispatch)();
                break;
            case room:
                getRoomSocket(dispatch, id)();
                break;
            case games:
                getGamesSocket(dispatch)();
                break;
            default:
                getIndexSocket(dispatch)();
                break;
        }
    }, []);
    const socket = useSelector<rootState, any>((state) => state.socket[`${type.toLowerCase()}Socket`]);

    const socketPromise = new Promise((res) => {
        const interval = setInterval(() => {
            if (socket && socket.readyState !== 0) {
                clearInterval(interval);
                res(socket);
            }
        });
    });

    return socketPromise;
};

export default useGetSocket;
