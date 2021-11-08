/* Album component that will display the title, artist, release year, and cover art */

import React from 'react';
import { Link } from 'react-router-dom';
import defaultAlbumCover from '../assets/default-album-cover.png';

const FaveAlbum = ({ id, image, name }) => {
    //later create a function that more dynamically shortens the title? or find a library for this?
    if (name.length > 19) {
        name = name.substring(0, 18) + '...';
    }

    return (
        <div className="card" style={{ width: '25%' }}>
            <Link to={`/album/${id}`} className="favorite-link">
                <img src={image || defaultAlbumCover} className="card-img-top mt-2 pt-1" alt={name} />
                <div className="card-body d-flex justify-content-center">
                    <h5 className="favorite-name">{name}</h5>
                </div>
            </Link>
        </div>
    )
}

export default FaveAlbum;