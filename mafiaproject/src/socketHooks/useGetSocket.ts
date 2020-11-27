import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../store/types/rootState';
import { getSocket } from '../store/actions';

const useGetSocket = () => {
    const dispatch = useDispatch();
    const id = useSelector<rootState, any>((state) => state.socket.id);

    useEffect(() => {
        getSocket(dispatch, 'room', id)();
    }, []);
    const roomSocket = useSelector<rootState, any>((state) => state.socket.roomSocket);

    const socketPromise = new Promise((res) => {
        setInterval(() => {
            if (roomSocket && roomSocket.readyState !== 0) {
                res(roomSocket);
            }
        });
    });

    return socketPromise;
};

export default useGetSocket;
