import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const StartPage = () => {
    const newUrl = `/room/${uuidv4()}`;
    return <Link to={newUrl}>to</Link>;
};

export default StartPage;
