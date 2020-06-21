import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { getSocket, getId, sendGameName } from '../../../store/actions';

import ChatRoom from '../chatRoom';

const ChatRoomSocketCreator = (props) => {
    const [socketConnected, setsocketConnected] = useState(false);
    const [ready, setReady] = useState(false);
    const dispatch = useDispatch(false);
    const indexSocket = useSelector((state) => state.socket.indexSocket);
    // id вытаскиваем из урла так как можем переходить по ссылке
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
                    // обнуляем имя чтобы не добавлять комнаты
                    // повторно в список комнат при навигации
                    dispatch(sendGameName('no'));
                    // был баг с сокетом, видимо к моменту
                    // создания чатрума роут не успевал создаваться
                    // поэтому добавил таймер
                    setTimeout(() => setReady(true), 300);
                    clearInterval(interval);
                }
            });
        }
    }, [socketConnected]);

    return ready ? <ChatRoom /> : <div>loading</div>;
};

export default withRouter(ChatRoomSocketCreator);
