import { setIndexSocket, setRoomSocket, setGamesSocket } from './types';

const initState = {
    indexSocket: null,
    roomSocket: null,
    gamesSocket: null,
};

const socketReducer = (state = initState, action) => {
    switch (action.type) {
        case setIndexSocket:
            return { ...state, indexSocket: action.payLoad };
        case setRoomSocket:
            return { ...state, roomSocket: action.payLoad };
        case setGamesSocket:
            return { ...state, gamesSocket: action.payLoad };
        default:
            return state;
    }
};

export default socketReducer;
