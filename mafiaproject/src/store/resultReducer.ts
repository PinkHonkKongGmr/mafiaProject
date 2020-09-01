import { setMessage } from './types';

const initState = {
    result: 'сообщений пока нет',
};

const messageReducer = (state = initState, action) => {
    switch (action.type) {
        case setMessage:
            return { ...state, result: action.payLoad };
        default:
            return state;
    }
};

export default messageReducer;
