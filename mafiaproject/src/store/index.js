import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createReducer from './reducers';

export default () => createStore(createReducer(), applyMiddleware(thunk));
