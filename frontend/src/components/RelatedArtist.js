import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from './firebase/FirebaseContext';
import { UserContext } from '../UserContext';
import { useAuth0 } from "@auth0/auth0-react";
import { onValue, ref } from 'firebase/database';
import { addArtistToProfile } from '../functions/addFavorites';

const RelatedArtist = ({ artist }) => {
    const { isAuthenticated, isLoading } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    const { database } = useContext(FirebaseContext);

    //check if artist already added to faves
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (isAuthenticated && !isLoading && loggedInUser) {
            setAdded(false);

            let dbId = loggedInUser.email.substr(0, loggedInUser.email.indexOf('.'));
            onValue(ref(database, `faveArtist/${artist.id}${dbId}`), (snapshot) => {
                if (snapshot.val()) {
                    setAdded(true);
                }
            });
        }
    }, [database, isAuthenticated, isLoading, loggedInUser])

    return <li className="list-group-item artist-card-list">
        <div className="row">
            <div className="col-10">
                <Link to={`/artist/${artist.id}`} className="artist-card-link">{artist.name}</Link>
            </div>
            <div className="col-2 d-flex justify-content-end">
                {isAuthenticated && !added && <button onClick={() => addArtistToProfile(artist.id, isAuthenticated, isLoading, loggedInUser, database)} type="button" className="btn buttons btn-sm d-none d-xl-block">+</button>}
                {isAuthenticated && added && <button type="button" className="btn checkmark-button btn-sm d-none d-xl-block" disabled>&#10004;</button>}
            </div>
        </div>
    </li>
}

export default RelatedArtist;