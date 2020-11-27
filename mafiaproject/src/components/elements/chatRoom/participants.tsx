import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const Participants = ({ participants }) => {
    const participantsToRender = participants ? participants : [];
    return (
        <div className="participants">
            <h2>Участники: </h2>
            {participantsToRender.map((participant) => (
                <div key={uuidv4()}>{participant}</div>
            ))}
        </div>
    );
};

export default Participants;
