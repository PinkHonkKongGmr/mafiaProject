import { sendNameOfTheGame, getGameSocket } from './types';

const initState = {
    name: 'no',
    gameSocket: null,
};

const giveTheGameName = (state = initState, action) => {
    switch (action.type) {
        case sendNameOfTheGame:
            return { ...state, name: action.payLoad };
        case getGameSocket:
            return { ...state, gameSocket: action.payLoad };
        default:
            return state;
    }
};

export default giveTheGameName;
