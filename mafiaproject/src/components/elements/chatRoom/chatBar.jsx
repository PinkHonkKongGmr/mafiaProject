import React from 'react';
import Participants from './participants';
import MessagesBar from './messagesBar.jsx';

const ChatBar = ({ data }) => {
    return (
        <div className="chat_main">
            <MessagesBar msgs={data.messages} />
            <Participants participants={data.participants} />
        </div>
    );
};

export default ChatBar;
