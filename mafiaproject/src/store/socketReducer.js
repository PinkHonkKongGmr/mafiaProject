import { setIndexSocket, setRoomSocket, setId } from './types';

const initState = {
    indexSocket: null,
    roomSocket: null,
    id: null,
};

const socketReducer = (state = initState, action) => {
    switch (action.type) {
        case setIndexSocket:
            return { ...state, indexSocket: action.payLoad };
        case setRoomSocket:
            return { ...state, roomSocket: action.payLoad };
        case setId:
            return { ...state, id: action.payLoad };
        default:
            return state;
    }
};

export default socketReducer;
