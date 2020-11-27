import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSocket } from '../../../store/actions';
import { rootState } from '../../../store/types/rootState';
// eslint-disable-next-line import/extensions
import ChatBarStore from './chatBarStore.jsx';
import ChatFormStore from './chatFormStore';
import './chatroom.scss';

const ChatRoom = () => {
    const dispatch = useDispatch();
    const roomSocket = useSelector<rootState, any>((state) => state.socket.roomSocket);
    const id = useSelector<rootState, any>((state) => state.socket.id);

    useEffect(() => {
        getSocket(dispatch, 'room', id)();
    }, []);

    return (
        <>
            <ChatBarStore roomSocket={roomSocket} />
            <ChatFormStore roomSocket={roomSocket} />
        </>
    );
};

export default ChatRoom;
