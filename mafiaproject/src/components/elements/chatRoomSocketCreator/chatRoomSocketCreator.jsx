import React, { useState } from 'react';
import useGetSocket from '../../../socketHooks/useGetSocket';
import ChatRoomLauncher from './chatRoomLauncher';
import Loader from '../../loaders/loader';
import sockets from '../../../constants/socketConstants';

const ChatRoomSocketCreator = () => {
    const [indexSocket, setIndexSocket] = useState(null);
    const { index } = sockets;

    useGetSocket(index).then((rs) => {
        setTimeout(() => {
            setIndexSocket(rs);
        }, 600);
    });

    if (indexSocket) {
        return <ChatRoomLauncher indexSocket={indexSocket} />;
    }

    return <Loader />;
};

export default ChatRoomSocketCreator;
