import React, { useEffect, useState } from 'react';
import { getId } from '../../../store/actions';
import ChatBar from './chatBar.jsx';
import { useDispatch } from 'react-redux';
const name = localStorage.getItem('playerName');

const ChatBarStore = ({ roomSocket }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({});

    useEffect(() => {
        const initMessage = JSON.stringify({
            service: true,
            name,
        });
        roomSocket.send(initMessage);
        roomSocket.onmessage = (event) => {
            const objectWithDataFromServer = JSON.parse(event.data);
            setData(objectWithDataFromServer);
        };

        return () => {
            dispatch(getId(null));
            if (roomSocket !== null) roomSocket.close();
        };
    }, [roomSocket]);

    return <ChatBar data={data} />;
};

export default ChatBarStore;
