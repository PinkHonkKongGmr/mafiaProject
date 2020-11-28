import { sendNameOfTheGame, setId } from './types';

const initState = {
    name: 'no',
    id: null,
};

const gameParams = (state = initState, action) => {
    switch (action.type) {
        case sendNameOfTheGame:
            return { ...state, name: action.payLoad };
        case setId:
            return { ...state, id: action.payLoad };
        default:
            return state;
    }
};

export default gameParams;
