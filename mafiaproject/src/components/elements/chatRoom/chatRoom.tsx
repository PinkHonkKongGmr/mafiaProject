import React, { useState } from 'react';
import useGetSocket from '../../../socketHooks/useGetSocket';
import ChatBarStore from './chatBarStore.jsx';
import ChatFormStore from './chatFormStore';
import './chatroom.scss';

const ChatRoom = () => {
    const [roomSocket, setRoomSocket] = useState<any>(null);
    useGetSocket('room').then((rs) => {
        setRoomSocket(rs);
    });

    if (roomSocket) {
        return (
            <>
                <ChatBarStore roomSocket={roomSocket} />
                <ChatFormStore roomSocket={roomSocket} />
            </>
        );
    }
    return <div>...loading</div>;
};

export default ChatRoom;
