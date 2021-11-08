import React from 'react';
import { Link } from 'react-router-dom';
import defaultAlbumCover from '../assets/default-album-cover.png';

const FaveArtist = ({ id, name, image }) => {
    //abbreviate name if too long
    if (name.length > 21) {
        name = name.substring(0, 20) + '...';
    }

    return (
        <div className="card" style={{ width: '25%' }}>
            <Link to={`/artist/${id}`} className="favorite-link">
                <img src={image || defaultAlbumCover} className="card-img-top mt-2 pt-1" alt={name} />
                <div className="card-body d-flex justify-content-center">
                    <h5 className="card-title favorite-name">{name}</h5>
                </div>
            </Link>
        </div>
    )
}

export default FaveArtist;