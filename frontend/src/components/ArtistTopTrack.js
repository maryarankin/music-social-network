import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from './firebase/FirebaseContext';
import { UserContext } from '../UserContext';
import { useAuth0 } from "@auth0/auth0-react";
import { onValue, ref } from 'firebase/database';
import { addTrackToProfile } from '../functions/addFavorites';

const ArtistTopTrack = ({ track }) => {
    const { isAuthenticated, isLoading } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    const { database } = useContext(FirebaseContext);

    //check if track already added to faves
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (isAuthenticated && !isLoading && loggedInUser) {
            setAdded(false);

            let dbId = loggedInUser.email.substr(0, loggedInUser.email.indexOf('.'));
            onValue(ref(database, `faveTrack/${track.id}${dbId}`), (snapshot) => {
                if (snapshot.val()) {
                    setAdded(true);
                }
            });
        }
    }, [database, isAuthenticated, isLoading, loggedInUser])

    return <li className="list-group-item artist-card-list">
        <div className="row">
            <div className="col-10">
                <Link to={`/album/${track.album.id}`} className="artist-card-link">{track.name}</Link>
            </div>
            <div className="col-2 d-flex justify-content-end">
                {isAuthenticated && !added && <button onClick={() => addTrackToProfile(track.id, isAuthenticated, isLoading, loggedInUser, database)} type="button" className="btn buttons btn-sm d-none d-xl-block">+</button>}
                {isAuthenticated && added && <button type="button" className="btn checkmark-button btn-sm d-none d-xl-block" disabled>&#10004;</button>}
            </div>
        </div>
    </li>
}

export default ArtistTopTrack;