import React from 'react';
import Name from './name';
import Nav from './nav.jsx';

const AuthPassStartPage = ({ name }) => (
    <>
        <h3>
            <Name name={name} />
        </h3>
        <Nav />
    </>
);

export default AuthPassStartPage;
