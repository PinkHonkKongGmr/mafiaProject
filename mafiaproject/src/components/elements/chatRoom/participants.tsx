import React from 'react';

type ParticipantsProps = {
    participants: Array<string>;
};
const Guests: React.FC<ParticipantsProps> = ({ participants }) => {
    return (
        <div className="participants">
            <h2>Участники: </h2>
            {participants.map((participant) => (
                <div key={participant}>{participant}</div>
            ))}
        </div>
    );
};

export default Guests;
