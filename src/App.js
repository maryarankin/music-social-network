import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ArtistSearch from './pages/search/ArtistSearch';
import AlbumSearch from './pages/search/AlbumSearch';
import TrackSearch from './pages/search/TrackSearch';
import ShowArtist from './pages/show/ShowArtist';
import ShowAlbum from './pages/show/ShowAlbum';
import ShowTrack from './pages/show/ShowTrack';

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
            <Route path="/artistsearch">
                <ArtistSearch accessToken={accessToken} />
            </Route>
            <Route path="/artist">
                <ShowArtist accessToken={accessToken} />
            </Route>
            <Route path="/albumsearch">
                <AlbumSearch accessToken={accessToken} />
            </Route>
            <Route path="/album">
                <ShowAlbum />
            </Route>
            <Route path="/tracksearch">
                <TrackSearch accessToken={accessToken} />
            </Route>
            <Route path="/track">
                <ShowTrack />
            </Route>
        </Switch>
    </Router>
}

export default App;