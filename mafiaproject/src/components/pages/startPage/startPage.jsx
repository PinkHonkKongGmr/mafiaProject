/* eslint-disable import/extensions */
import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthPassStartPage from './authPassStartPage';
import paths from '../../../constants/paths';

const StartPage = () => {
    const name = localStorage.getItem('playerName');
    const { auth } = paths;
    return name === null ? <Redirect to={auth} /> : <AuthPassStartPage name={name} />;
};

export default StartPage;
