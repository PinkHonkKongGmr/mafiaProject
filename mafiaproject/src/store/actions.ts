import { setMessage, setId, sendNameOfTheGame } from './types';

export const getId = (id) => ({
    type: setId,
    payLoad: id,
});

export const getMessages = (data) => ({
    type: setMessage,
    payLoad: data,
});

export const sendGameName = (name) => {
    return {
        type: sendNameOfTheGame,
        payLoad: name,
    };
};
