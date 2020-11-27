import React, { useEffect, useRef } from 'react';
import Message from './message';
import { v4 as uuidv4 } from 'uuid';

const MessagesBar = ({ msgs }) => {
    const msgsBarRef = useRef(null);
    useEffect(() => {
        msgsBarRef.current.scrollTop = msgsBarRef.current.scrollHeight;
    }, [msgs]);

    const messages = msgs ? msgs : [];

    return (
        <div ref={msgsBarRef} className="chat_window">
            {messages.map((el) => (
                <Message key={uuidv4()} name={el.name} msg={el.message} />
            ))}
        </div>
    );
};

export default MessagesBar;
