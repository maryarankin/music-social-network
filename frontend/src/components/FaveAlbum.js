/* Album component that will display the title, artist, release year, and cover art */

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';
import { FirebaseContext } from './firebase/FirebaseContext';
import { UserContext } from '../UserContext';
import { useAuth0 } from "@auth0/auth0-react";
import { removeAlbum } from '../functions/removeFavorites';
import defaultAlbumCover from '../assets/default-album-cover.png';
const axios = require('axios');

const FaveAlbum = ({ id, editMode }) => {
    const { accessToken } = useContext(Context);
    const { isAuthenticated, isLoading } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    const { database } = useContext(FirebaseContext);

    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    const getAlbum = (accessToken, id) => {
        let options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/albums/${id}`,
            headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken }
        };

        axios.request(options).then(function (response) {
            setName(response.data.name);
            setImage(response.data.images[0].url);
            //setIsError(false);
        }).catch(function (error) {
            console.error(error);
            //setIsError(true);
        });
    }

    useEffect(() => {
        getAlbum(accessToken, id);
    }, [accessToken, id])

    return (
        <div className="card">
            <Link to={`/album/${id}`} className="favorite-link">
                <img src={image || defaultAlbumCover} className="card-img-top" alt={name} />
            </Link>
            <div className="card-body d-flex justify-content-center">
                <h5 className="favorite-name">{name}</h5>
                {editMode && <button onClick={() => removeAlbum(id, isAuthenticated, isLoading, loggedInUser, database)} type="button" className="btn-close remove-button" aria-label="Close"></button>}
            </div>
        </div>
    )
}

export default FaveAlbum;