import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Artist from './pages/Artist';

const App = (props) => {
    let accessToken = props.accessToken;

    return <Router>
        <Navbar />
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/profile">
                <Profile />
            </Route>
            <Route path="/artist">
                <Artist accessToken={accessToken} />
            </Route>
        </Switch>
    </Router>
}

export default App;