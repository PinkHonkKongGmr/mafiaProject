import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { getSocket, getId } from '../../../store/actions';

import ChatRoom from '../chatRoom';

const ChatRoomSocketCreator = (props) => {
    const [socketConnected, setsocketConnected] = useState(false);
    const dispatch = useDispatch();
    const indexSocket = useSelector((state) => state.socket.indexSocket);
    const { id } = props.match.params;
    useEffect(() => {
        getSocket(dispatch, 'index')();
    }, []);
    useEffect(() => {
        if (indexSocket !== null) {
            const interval = setInterval(() => {
                if (indexSocket.readyState !== 0) {
                    dispatch(getId(id));
                    indexSocket.send(id);
                    setsocketConnected(true);
                    clearInterval(interval);
                }
            });
        }
    }, [indexSocket]);

    return socketConnected ? <ChatRoom /> : <div>loading</div>;
};

export default withRouter(ChatRoomSocketCreator);
