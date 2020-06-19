import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { getSocket, getId } from '../../../store/actions';

import ChatRoom from '../chatRoom';

const ChatRoomSocketCreator = (props) => {
    const [socketConnected, setsocketConnected] = useState(false);
    const [ready, setReady] = useState(false);
    const dispatch = useDispatch(false);
    const indexSocket = useSelector((state) => state.socket.indexSocket);
    const { id } = props.match.params;
    const name = useSelector((state) => state.game.name);

    useEffect(() => {
        getSocket(dispatch, 'index')();
    }, []);
    useEffect(() => {
        if (indexSocket !== null) {
            const interval = setInterval(() => {
                if (indexSocket.readyState !== 0) {
                    dispatch(getId(id));
                    setsocketConnected(true);
                    clearInterval(interval);
                }
            });
        }
    }, [indexSocket]);

    useEffect(() => {
        if (socketConnected) {
            const interval = setInterval(() => {
                if (indexSocket.state !== 0) {
                    indexSocket.send(JSON.stringify({ id, name }));
                    setReady(true);
                    clearInterval(interval);
                }
            });
        }
    }, [socketConnected]);

    return ready ? <ChatRoom /> : <div>loading</div>;
};

export default withRouter(ChatRoomSocketCreator);
