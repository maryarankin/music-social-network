/* Album component that will display the title, artist, release year, and cover art */

import React from 'react';
import { Link } from 'react-router-dom';
import defaultAlbumCover from '../assets/default-album-cover.png';

const Album = ({ id, artists, images, name, release_date }) => {
    //later create a function that more dynamically shortens the title? or find a library for this?
    if (name.length > 19) {
        name = name.substring(0, 18) + '...';
    }

    return (
        <div className="card" style={{ width: '75%' }}>
            <img src={images[0].url || defaultAlbumCover} className="card-img-top" alt={name} />
            <div className="card-body">
                <h5 className="card-title album-title">{name} ({release_date.substring(0, 4)})</h5>
                <p className="card-text">{artists[0].name}</p>
                <Link to={`/album/${id}`} className="btn buttons">View</Link>
            </div>
        </div>
    )
}

export default Album;