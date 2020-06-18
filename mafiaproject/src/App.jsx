import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StartPage from './components/containers/startPage';
import ChatRoomSocketCreator from './components/elements/chatRoomSocketCreator';
import './styles/main.scss';

const App = () => (
    <Router>
        <Switch>
            <Route path="/" component={StartPage} exact />
            <Route path="/room/:id" component={ChatRoomSocketCreator} />
        </Switch>
    </Router>
);
export default App;
