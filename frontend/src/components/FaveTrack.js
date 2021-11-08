import React from 'react';
import { Link } from 'react-router-dom';
import defaultAlbumCoverDark from '../assets/default-album-cover-dark.png';

const FaveTrack = ({ name, albumCover, albumId }) => {
    //abbreviate name if too long
    if (name.length > 21) {
        name = name.substring(0, 20) + '...';
    }

    return (
        <div className="card" style={{ width: '25%' }}>
            <Link to={`/album/${albumId}`} className="favorite-link">
                <img src={albumCover || defaultAlbumCoverDark} className="card-img-top mt-2 pt-1" alt={name} />
                <div className="card-body d-flex justify-content-center">
                    <h5 className="card-title favorite-name">{name}</h5>
                </div>
            </Link>
        </div>
    )
}

export default FaveTrack;