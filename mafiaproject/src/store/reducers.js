import { combineReducers } from 'redux';
import socketReducer from './socketReducer';
import resultReducer from './resultReducer';
import gameReducer from './gameReducer';

export default () =>
    combineReducers({
        socket: socketReducer,
        result: resultReducer,
        game: gameReducer,
    });
