import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Profile from './pages/Profile';
import ArtistSearch from './pages/search/ArtistSearch';
import AlbumSearch from './pages/search/AlbumSearch';
import TrackSearch from './pages/search/TrackSearch';
import ShowArtist from './pages/show/ShowArtist';
import ShowAlbum from './pages/show/ShowAlbum';
import ShowTrack from './pages/show/ShowTrack';
import NotFound from './components/NotFound';

const App = ({ accessToken }) => {
    return <Router>
        <Navbar />
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/profile">
                <Profile />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/artistsearch">
                <ArtistSearch />
            </Route>
            <Route path="/artist/:id" children={<ShowArtist />}>
            </Route>
            <Route path="/albumsearch">
                <AlbumSearch />
            </Route>
            <Route path="/album/:id" children={<ShowAlbum />}>
            </Route>
            <Route path="/tracksearch">
                <TrackSearch />
            </Route>
            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    </Router>
}

export default App;