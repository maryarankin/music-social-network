/* card component to display artist info on artist show page */

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from './firebase/FirebaseContext';
import { UserContext } from '../UserContext';
import { useAuth0 } from "@auth0/auth0-react";
import { onValue, ref } from 'firebase/database';
import { addArtistToProfile } from '../functions/addFavorites';
import DarkStars from './DarkStars';
import ArtistTopTrack from './ArtistTopTrack';
import RelatedArtist from './RelatedArtist';
//import axios from 'axios';

const ArtistCard = ({ id, artistName, artistImage, artistGenre, artistFollowers, artistPopularity, artistTopTracks, relatedArtists }) => {
    const { isAuthenticated, isLoading } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    const { database } = useContext(FirebaseContext);

    //abbreviate top track names if too long
    artistTopTracks.forEach(track => {
        if (track.name.length > 38) {
            track.name = track.name.substring(0, 37) + '...';
        }
    })

    //check if artist already added to faves
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (isAuthenticated && !isLoading && loggedInUser) {
            setAdded(false);

            let dbId = loggedInUser.email.substr(0, loggedInUser.email.indexOf('.'));
            onValue(ref(database, `faveArtist/${id}${dbId}`), (snapshot) => {
                if (snapshot.val()) {
                    setAdded(true);
                }
            });
        }
    }, [isAuthenticated, !isLoading, loggedInUser, id])

    return <>
        <div className="container mt-5 mx-5 d-flex justify-content-center">
            <div className="card artist-card d-flex justify-content-center" style={{ width: '75%' }}>
                <img src={artistImage} className="card-img-top artist-picture mt-2" alt={artistName} />
                <div className="card-body">
                    <h5 className="card-title">{artistName}</h5>
                    <p className="card-text">Genre: {artistGenre}</p>
                    <p className="card-text">Followers: {artistFollowers}</p>
                    <p className="card-text d-inline"><span>Popularity: </span></p>
                    <DarkStars popularity={artistPopularity} />
                </div>
                <div className="card-body">
                    {isAuthenticated && !added && <button onClick={() => addArtistToProfile(id, isAuthenticated, isLoading, loggedInUser, database)} type="button" className="btn buttons">Add Artist</button>}
                    {isAuthenticated && added && <button type="button" className="btn checkmark-button" disabled>&#10004;</button>}
                </div>

                <div className="card-header artist-card-list-header mt-3">
                    Top Songs
                </div>
                <ul className="list-group list-group-flush">
                    {artistTopTracks.map((track) => {
                        return <ArtistTopTrack key={track.id} track={track} />
                    })}
                </ul>

                <div className="card-header artist-card-list-header">
                    Related Artists
                </div>
                <ul className="list-group list-group-flush">
                    {relatedArtists.map((artist) => {
                        return <RelatedArtist key={artist.id} artist={artist} />
                    })}
                </ul>
            </div>
        </div>
    </>

}

export default ArtistCard;