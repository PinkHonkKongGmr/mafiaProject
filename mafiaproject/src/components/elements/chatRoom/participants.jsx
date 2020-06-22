import React from 'react';

const Guests = (props) => {
    return (
        <div className="participants">
            {props.participants.map((participants) => (
                <div>{participants}</div>
            ))}
        </div>
    );
};

export default Guests;
