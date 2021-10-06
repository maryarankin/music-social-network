import React from 'react';
import { Link } from 'react-router-dom';

const AlbumCard = ({ albumName, albumCover, albumArtist, albumArtistId, albumReleaseDate, albumPopularity }) => {
    return <>
        <div className="container mt-5 mx-5">
            <div className="card profile-card d-flex justify-content-center" style={{ width: '25rem' }}>
                <img src={albumCover} className="card-img-top album-cover mt-4" alt={albumName} />
                <div className="card-body">
                    <h5 className="card-title">{albumName}</h5>
                    <p><Link to={`/artist/${albumArtistId}`} className="card-text artist-name-link">Artist: {albumArtist}</Link></p>
                    <p className="card-text">Release Date: {albumReleaseDate.substring(0, 4)}</p>
                    <p className="card-text">Popularity: {albumPopularity}</p>
                </div>
                <div className="card-body">
                    <Link to="/" type="button" className="btn buttons mx-3">Add Album to Board</Link>
                </div>
            </div>
        </div>
    </>
}

export default AlbumCard;