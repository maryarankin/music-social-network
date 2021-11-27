/* component for an individual track on album show page */

import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../Context';
import { FirebaseContext } from './firebase/FirebaseContext';
import { UserContext } from '../UserContext';
import { useAuth0 } from "@auth0/auth0-react";
import { onValue, ref } from 'firebase/database';
import { addTrackToProfile } from '../functions/addFavorites';
import Stars from './Stars'
import defaultAlbumCoverDark from '../assets/default-album-cover-dark.png';
const axios = require('axios');

const Track = ({ track_number, name, duration_ms, id }) => {
    const { accessToken } = useContext(Context);
    const { isAuthenticated, isLoading } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    const { database } = useContext(FirebaseContext);

    //convert duration from ms to 00:00 format
    let minutes = duration_ms / 60000;
    let min = Math.floor(minutes);
    let sec = Math.floor((minutes * 60) % 60);
    if (sec < 10) {
        sec = '0' + sec;
    }
    let duration = min + ':' + sec;

    //abbreviate name if too long
    if (name.length > 21) {
        name = name.substring(0, 20) + '...';
    }

    //have to make another api call to get the track's popularity
    const [popularity, setPopularity] = useState(0);

    const getTrack = (accessToken, id) => {
        var options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/tracks/${id}/`,
            headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken }
        };

        axios.request(options).then(function (response) {
            setPopularity(response.data.popularity);
        }).catch(function (error) {
            console.error(error);
        });
    }

    useEffect(() => {
        getTrack(accessToken, id);
    }, [accessToken, id])

    //check if track already added to faves
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (isAuthenticated && !isLoading && loggedInUser) {
            setAdded(false);

            let dbId = loggedInUser.email.substr(0, loggedInUser.email.indexOf('.'));
            onValue(ref(database, `faveTrack/${id}${dbId}`), (snapshot) => {
                if (snapshot.val()) {
                    setAdded(true);
                }
            });
        }
    }, [isAuthenticated, !isLoading, loggedInUser, id])

    return (
        <div className="card" style={{ width: '75%' }}>
            <img src={defaultAlbumCoverDark} className="card-img-top album-cover my-4" alt={name} />
            <div className="card-body">
                <h5 className="card-title album-title">{track_number}. {name}</h5>
                <p className="card-text mt-3">Duration: {duration}</p>
                <p className="card-text d-inline"><span>Popularity: </span></p>
                <Stars popularity={popularity} />
                <div className="mt-3">
                    {isAuthenticated && !added && <button onClick={() => addTrackToProfile(id, isAuthenticated, isLoading, loggedInUser, database)} type="button" className="btn buttons">+</button>}
                    {isAuthenticated && added && <button type="button" className="btn checkmark-button" disabled>&#10004;</button>}
                </div>
            </div>
        </div>
    )
}

export default Track;