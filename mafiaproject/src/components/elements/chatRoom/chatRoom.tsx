import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getSocket, getId, getMessages } from '../../../store/actions';
import {rootState} from '../../../store/types/rootState';
// eslint-disable-next-line import/extensions
import Participants from './participants.jsx';
import './chatroom.scss';

const ChatRoom = () => {
    const [value, setValue] = useState<string | null>(null);
    const [wrong, setWrong] = useState(false)
    const [data, setData] = useState([]);
    const [participants, setParticipants] = useState([]);
    const dispatch = useDispatch();
    const roomSocket = useSelector((state:rootState) => state.socket.roomSocket);
    const id = useSelector((state:rootState) => state.socket.id);
    const name = localStorage.getItem('playerName');
    const chatWindowRef = useRef<HTMLDivElement|null>(null);
    const msgsWindowRef = useRef<HTMLDivElement|null>(null);



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
                        if (objectWithDataFromServer.updateParticipants)
                            setParticipants(objectWithDataFromServer.participants);

                        setData(objectWithDataFromServer.messages);
                    };
                    clearInterval(interval);
                }
            });
        }
        return () => {
            dispatch(getId(null));
            if (roomSocket !== null) roomSocket.close();
        };
    }, [roomSocket]);

    useEffect(() => {
       
        chatWindowRef.current!.scrollTop = msgsWindowRef.current!.scrollHeight
    }, [data]);

    const changeHandler = (e) => setValue(e.target.value);

    const check = (str)=>str.length < 2

  

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

    const regularEmail: RegExp = /^(\w+)@(\w+)\.(\w{1,99})$/ig;

    const isEmail = (value: string): boolean =>  regularEmail.test(value)

    const onBlurHandler =(e)=>{
        let result = isEmail(e.target.value);
        setWrong (!result);
        
        
    }

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
            <form name="publish" onSubmit={submitHandler} className={wrong?'wrong':''}>
                
                <input type="text" name="message" onChange={changeHandler} onBlur={onBlurHandler}/>
                <button type="submit">Отправить</button>
            </form>
        </>
    );
};

export default ChatRoom;
