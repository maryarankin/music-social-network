/* Profile page where all of a user's information is shown; also where they can display their favorite albums, songs, and artists */

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
//import firebase from '../firebase';
import { useAuth0 } from "@auth0/auth0-react";
import { ref, onValue, query, orderByChild, equalTo, limitToLast } from 'firebase/database';
import { FirebaseContext } from '../components/firebase/FirebaseContext';
import { UserContext } from '../UserContext';
import FaveAlbum from '../components/FaveAlbum';
import FaveTrack from '../components/FaveTrack';
import FaveArtist from '../components/FaveArtist';
//import { albumData } from '../data/albumData';
import ProfileCard from '../components/ProfileCard';

const Profile = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const { database } = useContext(FirebaseContext);
    const { loggedInUser } = useContext(UserContext);

    const [inEditMode, setInEditMode] = useState(false);

    const editMode = () => {
        setInEditMode(!inEditMode);
    }

    const [favoriteAlbums, setFavoriteAlbums] = useState([]);
    const [favoriteTracks, setFavoriteTracks] = useState([]);
    const [favoriteArtists, setFavoriteArtists] = useState([]);

    //favorite artists
    useEffect(() => {
        if (isAuthenticated && !isLoading && loggedInUser) {
            const artistRef = query(ref(database, 'faveArtist'), orderByChild('user'), equalTo(loggedInUser.email));

            onValue(artistRef, (snapshot) => {
                setFavoriteArtists([]);
                snapshot.forEach((childSnapshot) => {
                    setFavoriteArtists(favoriteArtists => [...favoriteArtists, childSnapshot.val()]);
                })
            })
        }
    }, [isAuthenticated, isLoading, loggedInUser])

    //favorite tracks
    useEffect(() => {
        if (isAuthenticated && !isLoading && loggedInUser) {
            const trackRef = query(ref(database, 'faveTrack'), orderByChild('user'), equalTo(loggedInUser.email));

            onValue(trackRef, (snapshot) => {
                setFavoriteTracks([]);
                snapshot.forEach((childSnapshot) => {
                    setFavoriteTracks(favoriteTracks => [...favoriteTracks, childSnapshot.val()]);
                })
            })
        }
    }, [isAuthenticated, isLoading, loggedInUser])

    //favorite albums
    useEffect(() => {
        if (isAuthenticated && !isLoading && loggedInUser) {
            const albumRef = query(ref(database, 'faveAlbum'), orderByChild('user'), equalTo(loggedInUser.email));

            onValue(albumRef, (snapshot) => {
                setFavoriteAlbums([]);
                snapshot.forEach((childSnapshot) => {
                    setFavoriteAlbums(favoriteAlbums => [...favoriteAlbums, childSnapshot.val()]);
                })
            })
        }
    }, [isAuthenticated, isLoading, loggedInUser])

    return (
        <>
            <div>
                {!isAuthenticated && !isLoading && <h2 className="mt-5 mx-5">Please sign in to continue.</h2>}

                {isAuthenticated && <div className="row mb-5">
                    <div className="col-9 d-flex justify-content-center">

                        <div className="grid">
                            <div className="row mt-5">
                                <h1 className="favorite-title mb-4">favorite artists</h1>
                                {favoriteArtists.map((faveArtist) => {
                                    return <div className="col-3">
                                        <FaveArtist key={faveArtist.artistId} id={faveArtist.artistId} editMode={inEditMode} />
                                    </div>
                                })}
                            </div>

                            <div className="row mt-5">
                                <h1 className="favorite-title mb-4">favorite tracks</h1>
                                {favoriteTracks.map((faveTrack) => {
                                    return <div className="col-3">
                                        <FaveTrack key={faveTrack.trackId} id={faveTrack.trackId} editMode={inEditMode} />
                                    </div>
                                })}
                            </div>

                            <div className="row mt-5">
                                <h1 className="favorite-title mb-4">favorite albums</h1>
                                {favoriteAlbums.map((faveAlbum) => {
                                    return <div className="col-3">
                                        <FaveAlbum key={faveAlbum.albumId} id={faveAlbum.albumId} editMode={inEditMode} />
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>


                    <div className="col">
                        {!loggedInUser && <h1>loading</h1>}
                        {loggedInUser && <ProfileCard user={loggedInUser} />}

                        <div className="container">
                            <div className="card d-flex justify-content-center" style={{ width: '75%' }}>
                                <div className="card-body">
                                    <button onClick={editMode} type="button" className="btn buttons mx-5">{inEditMode ? 'Done Editing' : 'Edit Favorites'}</button>
                                    <Link to="/profile/edit" type="button" className="btn buttons">Edit Profile</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        </>
    )
}

export default Profile;