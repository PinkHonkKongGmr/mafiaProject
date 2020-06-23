import React from 'react';

const Guests = (props) => {
    return (
        <div className="participants">
            <h2>Участники: </h2>
            {props.participants.map((participants) => (
                <div>{participants}</div>
            ))}
        </div>
    );
};

export default Guests;
