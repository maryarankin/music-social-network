/* card component for album info on album show page */

import React, { useContext } from 'react';
//import axios from 'axios';
import { Link } from 'react-router-dom';
import { FirebaseContext } from './firebase/FirebaseContext';
import { UserContext } from '../UserContext';
import { useAuth0 } from "@auth0/auth0-react";
import { addAlbumToProfile } from '../functions/addFavorites';

const AlbumCard = ({ id, albumName, albumCover, albumArtist, albumArtistId, albumReleaseDate, albumPopularity }) => {
    const { isAuthenticated, isLoading } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    const { database } = useContext(FirebaseContext);

    return <>
        <div className="container mt-5 mx-5 d-flex justify-content-center">
            <div className="card album-card d-flex justify-content-center" style={{ width: '75%' }}>
                <img src={albumCover} className="card-img-top album-cover mt-4" alt={albumName} />
                <div className="card-body">
                    <h5 className="card-title mb-3">{albumName}</h5>
                    <p>Artist: <Link to={`/artist/${albumArtistId}`} className="card-text album-card-artist-link">{albumArtist}</Link></p>
                    <p className="card-text">Release Date: {albumReleaseDate.substring(0, 4)}</p>
                    <p className="card-text">Popularity: {albumPopularity}</p>
                </div>
                {isAuthenticated && <div className="card-body">
                    <button onClick={() => addAlbumToProfile(id, isAuthenticated, isLoading, loggedInUser, database)} type="button" className="btn buttons mb-3">Add Album</button>
                </div>}
            </div>
        </div>
    </>
}

export default AlbumCard;