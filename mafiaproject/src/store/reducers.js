import { combineReducers } from 'redux';
import socketReducer from './socketReducer';
import resultReducer from './resultReducer';

export default () =>
    combineReducers({
        socket: socketReducer,
        result: resultReducer,
    });
