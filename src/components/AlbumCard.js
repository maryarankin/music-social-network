import React from 'react';
import { Link } from 'react-router-dom';

const AlbumCard = ({ albumName, albumCover, albumArtist, albumTracks, albumReleaseDate, albumPopularity }) => {
    return <>
        <div className="container mt-5">
            <div className="card profile-card d-flex justify-content-center" style={{ width: '18rem' }}>
                <img src={albumCover} className="card-img-top profile-picture mt-2" alt={albumName} />
                <div className="card-body">
                    <h5 className="card-title">{albumName}</h5>
                    <p className="card-text">Artist: {albumArtist}</p>
                    <p className="card-text">Release Date: {albumReleaseDate}</p>
                    <p className="card-text">Popularity: {albumPopularity}</p>
                </div>
                <ul className="list-group list-group-flush">
                    {albumTracks.map((track) => {
                        return <li key={track.id} className="list-group-item">{track.name}</li>
                    })}
                </ul>
                <div className="card-body">
                    <Link to="/" type="button" className="btn buttons mx-3">Add Artist to Board</Link>
                </div>
            </div>
        </div>
    </>
}

export default AlbumCard;