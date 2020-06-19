import { sendNameOfTheGame, getGames } from './types';

const initState = {
    name: 'no',
    games: [],
};

const giveTheGameName = (state = initState, action) => {
    switch (action.type) {
        case sendNameOfTheGame:
            return { ...state, name: action.payLoad };
        case getGames:
            return { ...state, games: action.payLoad };
        default:
            return state;
    }
};

export default giveTheGameName;
