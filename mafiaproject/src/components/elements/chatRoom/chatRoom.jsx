import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getSocket, getMessages } from '../../../store/actions';

const ChatRoom = () => {
    const [value, setValue] = useState(null);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const roomSocket = useSelector((state) => state.socket.roomSocket);
    const id = useSelector((state) => state.socket.id);
    const name = localStorage.getItem('playerName');
    useEffect(() => {
        getSocket(dispatch, 'room', id)();
    }, []);
    useEffect(() => {
        if (roomSocket !== null) {
            const interval = setInterval(() => {
                if (roomSocket.readyState !== 0) {
                    const initMessage = JSON.stringify({
                        init: true,
                        name,
                    });
                    roomSocket.send(initMessage);
                    roomSocket.onmessage = (event) => {
                        const objectWithDataFromServer = JSON.parse(event.data);

                        setData(objectWithDataFromServer.messages);
                    };
                    clearInterval(interval);
                }
            });
        }
        return () => {
            if (roomSocket !== null) roomSocket.close();
        };
    }, [roomSocket]);

    // useEffect(() => {
    //     console.log(data);
    //     dispatch(getMessages(data));
    // }, [data]);

    const changeHandler = (e) => setValue(e.target.value);

    const submitHandler = (e) => {
        e.preventDefault();
        const interval = setInterval(() => {
            if (roomSocket !== null) {
                if (roomSocket.readyState !== 0) {
                    const message = JSON.stringify({
                        init: false,
                        name,
                        message: value,
                    });
                    roomSocket.send(message);
                    clearInterval(interval);
                }
            }
        });

        return false;
    };

    const msgs = data instanceof Array ? data : JSON.parse(data);
    const messages = msgs.map((el) => <div key={uuidv4()}>{el}</div>);

    return (
        <>
            <form name="publish" onSubmit={submitHandler}>
                <input type="text" name="message" onChange={changeHandler} />
                <input type="submit" value="Отправить" />
            </form>

            <div>{messages}</div>
        </>
    );
};

export default ChatRoom;
