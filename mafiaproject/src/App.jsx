import React, { useEffect, useState } from 'react';
import { getSocket, getId } from './store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ChatRoom from './components/elements/chatRoom';
import './styles/main.scss';

const App = () => {
    const [socketConnected, setsocketConnected] = useState(false);
    const dispatch = useDispatch();
    const indexSocket = useSelector((state) => state.socket.indexSocket);
    const id = uuidv4();
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

export default App;
