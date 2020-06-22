import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getSocket, getId, getMessages } from '../../../store/actions';
// eslint-disable-next-line import/extensions
import Participants from './participants.jsx';
import './chatroom.scss';

const ChatRoom = () => {
    const [value, setValue] = useState(null);
    const [data, setData] = useState([]);
    const [participants, setParticipants] = useState([]);
    const dispatch = useDispatch();
    const roomSocket = useSelector((state) => state.socket.roomSocket);
    const id = useSelector((state) => state.socket.id);
    const name = localStorage.getItem('playerName');
    const chatWindowRef = useRef(null);
    const msgsWindowRef = useRef(null);
    useEffect(() => {
        getSocket(dispatch, 'room', id)();
    }, []);
    useEffect(() => {
        if (roomSocket !== null) {
            const interval = setInterval(() => {
                if (roomSocket.readyState !== 0) {
                    const initMessage = JSON.stringify({
                        service: true,
                        name,
                    });
                    roomSocket.send(initMessage);
                    roomSocket.onmessage = (event) => {
                        const objectWithDataFromServer = JSON.parse(event.data);
                        if (objectWithDataFromServer.sendNewNameParticipant)
                            setParticipants(objectWithDataFromServer.participants);

                        setData(objectWithDataFromServer.messages);
                    };
                    clearInterval(interval);
                }
            });
        }
        return () => {
            dispatch(getId(null));
            if (roomSocket !== null) {
                roomSocket.send(JSON.stringify({ service: true, out: true, name }));
                roomSocket.close();
            }
        };
    }, [roomSocket]);

    useEffect(() => {
        chatWindowRef.current.scrollTop = msgsWindowRef.current.scrollHeight;
    }, [data]);

    const changeHandler = (e) => setValue(e.target.value);

    const submitHandler = (e) => {
        e.preventDefault();
        const interval = setInterval(() => {
            if (roomSocket !== null) {
                if (roomSocket.readyState !== 0) {
                    const message = JSON.stringify({
                        service: false,
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
    const messages = msgs.map((el) => (
        <div key={uuidv4()} className="chat_cell">
            <div className="nickname_cell">{el.name}:</div>
            <div className="message_cell">{el.message}</div>
        </div>
    ));

    return (
        <>
            <div className="chat_main" ref={chatWindowRef}>
                <div className="chat_window" ref={msgsWindowRef}>
                    {messages}
                </div>
                <Participants participants={participants} />
            </div>
            <form name="publish" onSubmit={submitHandler} className="chat_form">
                <input type="text" name="message" onChange={changeHandler} />
                <button type="submit">Отправить</button>
            </form>
        </>
    );
};

export default ChatRoom;
