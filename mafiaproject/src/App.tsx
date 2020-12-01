import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './components/containers/auth';
import StartPage from './components/containers/startPage';
import CreateGame from './components/containers/createGame';
import Games from './components/containers/games';
import CheckAuthBeforeEnterRoom from './components/elements/checkAuthBeforeEnterRoom';
import paths from './constants/paths';

import 'antd/dist/antd.css';
import './styles/main.scss';

const App: React.FC = () => {
    const { index, auth, createGame, games, room } = paths;
    return (
        <Router>
            <Switch>
                <Route path={index} component={StartPage} exact />
                <Route path={auth} component={Auth} exact />
                <Route path={createGame} component={CreateGame} exact />
                <Route path={games} component={Games} />
                <Route path={room} component={CheckAuthBeforeEnterRoom} />
            </Switch>
        </Router>
    );
};
export default App;
