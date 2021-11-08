/* Profile page where all of a user's information is shown; also where they can display their favorite albums, songs, and artists */

import React, { useState, useEffect } from 'react';
import FaveAlbum from '../components/FaveAlbum';
import FaveTrack from '../components/FaveTrack';
import FaveArtist from '../components/FaveArtist';
//import { albumData } from '../data/albumData';
import ProfileCard from '../components/ProfileCard';

const Profile = () => {
    const [inEditMode, setInEditMode] = useState(false);

    const editMode = () => {
        setInEditMode(!inEditMode);
    }

    //REMOVE THIS LATER - JUST FOR TESTING
    const [userId, setUserId] = useState(0);

    const [favoriteAlbums, setFavoriteAlbums] = useState([]);
    const [favoriteTracks, setFavoriteTracks] = useState([]);
    const [favoriteArtists, setFavoriteArtists] = useState([]);

    useEffect(() => {
        fetch('/api/users').then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonResponse => {
            setUserId(jsonResponse[0].id);
        })
    }, [userId])

    useEffect(() => {
        fetch('/api/faves/albums').then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonResponse => {
            setFavoriteAlbums(jsonResponse);
        })
    }, [favoriteAlbums, inEditMode])

    useEffect(() => {
        fetch('/api/faves/artists').then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonResponse => {
            setFavoriteArtists(jsonResponse);
        })
    }, [favoriteArtists, inEditMode])

    useEffect(() => {
        fetch('/api/faves/tracks').then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonResponse => {
            setFavoriteTracks(jsonResponse);
        })
    }, [favoriteTracks, inEditMode])

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
                        <ProfileCard />

                        <div className="container">
                            <div className="card profile-card d-flex justify-content-center" style={{ width: '75%' }}>
                                <div className="card-body">
                                    <button onClick={editMode} type="button" className="btn buttons mx-3">{inEditMode ? 'Stop Editing' : 'Edit Profile'}</button>
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