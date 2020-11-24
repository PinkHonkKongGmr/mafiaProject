import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './components/containers/auth';
import StartPage from './components/containers/startPage';
import CreateGame from './components/containers/createGame';
import Games from './components/containers/games';
import ChatRoom from './components/elements/checkAuthBeforeEnterRoom';

import 'antd/dist/antd.css';
import './styles/main.scss';

const App: React.FC = () => (
    <Router>
        <Switch>
            <Route path="/" component={StartPage} exact />
            <Route path="/auth" component={Auth} exact />
            <Route path="/createGame" component={CreateGame} exact />
            <Route path="/games" component={Games} />
            <Route path="/room/:id" component={ChatRoom} />
        </Switch>
    </Router>
);
export default App;
