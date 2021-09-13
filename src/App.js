import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Profile from './pages/Profile';

const App = () => {
    return <Router>
        <Navbar />
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/profile">
                <Profile />
            </Route>
        </Switch>
    </Router>
}

export default App;