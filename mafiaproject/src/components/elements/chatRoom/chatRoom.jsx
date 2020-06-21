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
    useEffect(() => {
        getSocket(dispatch, 'room', id)();
    }, []);
    useEffect(() => {
        if (roomSocket !== null) {
            const interval = setInterval(() => {
                if (roomSocket.readyState !== 0) {
                    // чтобы получить сообщения отправляем сообщение с шифром
                    // на беке мы понимаем что его не надо класть в массив сообщений
                    roomSocket.send(id + 'no need to print it');
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
                    roomSocket.send(value);
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
