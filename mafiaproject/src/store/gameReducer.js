import { sendNameOfTheGame } from './types';

const initState = {
    gameName: 'no_name',
};

const giveTheGameName = (state = initState, action) => {
    switch (action.type) {
        case sendNameOfTheGame:
            return { ...state, gameName: action.payLoad };
        default:
            return state;
    }
};

export default giveTheGameName;
