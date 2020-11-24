/* eslint-disable import/extensions */
import React from 'react';
import { Redirect } from 'react-router-dom';
import Name from './name';
import Nav from './nav.jsx';

const StartPage = () => {
    const name = localStorage.getItem('playerName');
    const auth = '/auth';

    const toRender =
        name === null ? (
            <Redirect to={auth} />
        ) : (
            <>
                <h3>
                    <Name name={name} />
                </h3>
                <Nav />
            </>
        );
    return toRender;
};

export default StartPage;
