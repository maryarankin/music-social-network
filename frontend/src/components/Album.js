/* Album component that will display the title, artist, release year, and cover art */

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from './firebase/FirebaseContext';
import { UserContext } from '../UserContext';
import { useAuth0 } from "@auth0/auth0-react";
import { onValue, ref } from 'firebase/database';
import { addAlbumToProfile } from '../functions/addFavorites';
import defaultAlbumCover from '../assets/default-album-cover.png';

const Album = ({ id, artists, images, name, release_date }) => {
    const { isAuthenticated, isLoading } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    const { database } = useContext(FirebaseContext);

    //later create a function that more dynamically shortens the title? or find a library for this?
    if (name.length > 19) {
        name = name.substring(0, 18) + '...';
    }

    //check if album already added to faves
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (isAuthenticated && !isLoading && loggedInUser) {
            setAdded(false);

            let dbId = loggedInUser.email.substr(0, loggedInUser.email.indexOf('.'));
            onValue(ref(database, `faveAlbum/${id}${dbId}`), (snapshot) => {
                if (snapshot.val()) {
                    setAdded(true);
                }
            });
        }
    }, [database, isAuthenticated, isLoading, loggedInUser, id])

    return (
        <div className="card" style={{ width: '75%' }}>
            <img src={images[0] ? images[0].url : defaultAlbumCover} className="card-img-top" alt={name} />
            <div className="card-body">
                <h5 className="card-title album-title">{name} ({release_date.substring(0, 4)})</h5>
                <p className="card-text">{artists[0].name}</p>
                <div className="row">
                    <div className="col-6">
                        <Link to={`/album/${id}`} className="btn buttons">View</Link>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        {isAuthenticated && !added && <button onClick={() => addAlbumToProfile(id, isAuthenticated, isLoading, loggedInUser, database)} type="button" className="btn buttons">+</button>}
                        {isAuthenticated && added && <button className="btn checkmark-button" disabled>&#10004;</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Album;