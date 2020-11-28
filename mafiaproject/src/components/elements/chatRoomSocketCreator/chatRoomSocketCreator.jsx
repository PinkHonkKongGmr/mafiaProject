import React, { useState } from 'react';
import useGetSocket from '../../../socketHooks/useGetSocket';
import ChatRoomLauncher from './chatRoomLauncher';

const ChatRoomSocketCreator = () => {
    const [indexSocket, setIndexSocket] = useState(null);

    useGetSocket('index').then((rs) => {
        setIndexSocket(rs);
    });

    if (indexSocket) {
        return <ChatRoomLauncher indexSocket={indexSocket} />;
    }
    return <div>Loading</div>;
};

export default ChatRoomSocketCreator;
