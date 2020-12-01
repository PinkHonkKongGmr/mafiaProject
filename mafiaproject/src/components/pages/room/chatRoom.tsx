import React, { useState } from 'react';
import useGetSocket from '../../../socketHooks/useGetSocket';
import ChatBarStore from './chatBarStore.jsx';
import ChatFormStore from './chatFormStore';
import sockets from '../../../constants/socketConstants';
import Loading from '../../loaders/loading';
import './chatroom.scss';

const ChatRoom = () => {
    const [roomSocket, setRoomSocket] = useState<any>(null);
    const { room } = sockets;
    useGetSocket(room).then((rs) => {
        setTimeout(() => {
            setRoomSocket(rs);
        }, 200);
    });

    if (roomSocket) {
        return (
            <>
                <ChatBarStore roomSocket={roomSocket} />
                <ChatFormStore roomSocket={roomSocket} />
            </>
        );
    }

    return <Loading text="Get ready!" />;
};

export default ChatRoom;
