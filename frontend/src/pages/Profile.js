/* Profile page where all of a user's information is shown; also where they can display their favorite albums, songs, and artists */

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
//import firebase from '../firebase';
import { useAuth0 } from "@auth0/auth0-react";
import { ref, onValue, query, orderByChild, equalTo, limitToLast } from 'firebase/database';
import { FirebaseContext } from '../components/firebase/FirebaseContext';
import FaveAlbum from '../components/FaveAlbum';
import FaveTrack from '../components/FaveTrack';
import FaveArtist from '../components/FaveArtist';
//import { albumData } from '../data/albumData';
import ProfileCard from '../components/ProfileCard';

const Profile = () => {
    const { database } = useContext(FirebaseContext);
    const { user, isAuthenticated, isLoading } = useAuth0();

    const [inEditMode, setInEditMode] = useState(false);
    const [loading, setLoading] = useState(true);

    const editMode = () => {
        setInEditMode(!inEditMode);
    }

    const [loggedInUser, setLoggedInUser] = useState();

    const [favoriteAlbums, setFavoriteAlbums] = useState([]);
    const [favoriteTracks, setFavoriteTracks] = useState([]);
    const [favoriteArtists, setFavoriteArtists] = useState([]);

    // useEffect(() => {
    //     let cancel = false;
    //     setLoading(true);

    //     fetch('/api/users/1').then(res => {
    //         if (cancel) {
    //             return;
    //         }
    //         if (res.ok) {
    //             return res.json();
    //         }
    //     }).then(jsonResponse => {
    //         setUser(jsonResponse[0]);
    //         setLoading(false);
    //     })

    //     return () => {
    //         cancel = true;
    //     }
    // }, [])

    // const query = async () => {
    //     const queryUser = await database.collection('user').orderBy('username').limit(1).get();
    //     if (queryUser.size > 0) {
    //         const data = queryUser.docs[0].data();
    //         console.log(data);
    //     }
    // }



    useEffect(() => {
        let cancel = false;
        setLoading(true);

        const userRef = query(ref(database, 'user'), orderByChild('email'), equalTo(user.email));

        onValue(userRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                setLoggedInUser(childSnapshot.val());
                setLoading(false);

                // const childKey = childSnapshot.key;
                // const childData = childSnapshot.val();
                // console.log(childData);
                // if (user && childData.email == user.email) {
                //     setLoggedInUser(childData.email);
                // }
            })
        })

        return () => {
            cancel = true;
        }
    })

    // useEffect(() => {
    //     fetch('/api/faves/albums').then(res => {
    //         if (res.ok) {
    //             return res.json();
    //         }
    //     }).then(jsonResponse => {
    //         setFavoriteAlbums(jsonResponse);
    //     })
    // }, [favoriteAlbums])

    // useEffect(() => {
    //     fetch('/api/faves/artists').then(res => {
    //         if (res.ok) {
    //             return res.json();
    //         }
    //     }).then(jsonResponse => {
    //         setFavoriteArtists(jsonResponse);
    //     })
    // }, [favoriteArtists])

    // useEffect(() => {
    //     fetch('/api/faves/tracks').then(res => {
    //         if (res.ok) {
    //             return res.json();
    //         }
    //     }).then(jsonResponse => {
    //         setFavoriteTracks(jsonResponse);
    //     })
    // }, [favoriteTracks])

    return (
        <>
            <div>
                <div className="row mb-5">

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
                        {loading && <h1>loading</h1>}
                        {!loading && <ProfileCard user={loggedInUser} />}

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
            </div>
        </>
    )
}

export default Profile;