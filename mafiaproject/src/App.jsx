import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StartPage from './components/containers/startPage';
import CreateGame from './components/containers/createGame';
import Games from './components/containers/games';
import ChatRoomSocketCreator from './components/elements/chatRoomSocketCreator';

import './styles/main.scss';

const App = () => (
    <Router>
        <Switch>
            <Route path="/" component={StartPage} exact />
            <Route path="/createGame" component={CreateGame} exact />
            <Route path="/games" component={Games} />
            <Route path="/room/:id" component={ChatRoomSocketCreator} />
        </Switch>
    </Router>
);
export default App;
