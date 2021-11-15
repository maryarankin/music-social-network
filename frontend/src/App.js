import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { ref, onValue, query, orderByChild, equalTo } from 'firebase/database';
import { FirebaseContext } from './components/firebase/FirebaseContext';
import { UserContext } from './UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Profile from './pages/Profile';
import EditProfileCard from './components/EditProfileCard';
import ArtistSearch from './pages/search/ArtistSearch';
import AlbumSearch from './pages/search/AlbumSearch';
import TrackSearch from './pages/search/TrackSearch';
import ShowArtist from './pages/show/ShowArtist';
import ShowAlbum from './pages/show/ShowAlbum';
//import ShowTrack from './pages/show/ShowTrack';
import NotFound from './components/NotFound';

const App = ({ accessToken }) => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { database } = useContext(FirebaseContext);

    const [loggedInUser, setLoggedInUser] = useState();

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            const userRef = query(ref(database, 'user'), orderByChild('email'), equalTo(user.email));

            onValue(userRef, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    setLoggedInUser(childSnapshot.val());
                })
            })
        }
    }, [isAuthenticated, isLoading])


    return <UserContext.Provider value={{ loggedInUser }}>
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
                <Route path="/profile/edit">
                    <EditProfileCard />
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
    </UserContext.Provider>
}

export default App;