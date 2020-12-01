import React from 'react';

const Message = ({ name, msg }) => (
    <div>
        <div className="nickname_cell">{name}:</div>
        <div className="message_cell">{msg}</div>
    </div>
);

export default Message;
