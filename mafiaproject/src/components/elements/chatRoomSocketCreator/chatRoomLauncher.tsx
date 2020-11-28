import React, { useState, useEffect } from 'react';
import ChatRoom from '../chatRoom';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../../store/types/rootState';
import { sendGameName } from '../../../store/actions';

const ChatRoomLauncher = ({ indexSocket }) => {
    const dispatch = useDispatch();
    const [ready, setReady] = useState(false);
    const id = useSelector<rootState, any>((state) => state.socket.id);
    const name = useSelector<rootState, any>((state) => state.game.name);
    useEffect(() => {
        indexSocket.send(JSON.stringify({ id, name }));
        // обнуляем имя чтобы не добавлять комнаты
        // повторно в список комнат при навигации
        dispatch(sendGameName('no'));
        // был баг с сокетом, видимо к моменту
        // создания чатрума роут не успевал создаваться
        // поэтому добавил таймер
        setTimeout(() => setReady(true), 300);
    }, [indexSocket]);

    return ready ? <ChatRoom /> : <div>loading</div>;
};

export default ChatRoomLauncher;
