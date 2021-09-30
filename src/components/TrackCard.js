import React from 'react';
import { Link } from 'react-router-dom';

const TrackCard = ({ trackName, albumCover, trackArtist, albumName, trackDuration, trackPopularity }) => {
    return <>
        <div className="container mt-5">
            <div className="card profile-card d-flex justify-content-center" style={{ width: '18rem' }}>
                <img src={albumCover} className="card-img-top profile-picture mt-2" alt={albumName} />
                <div className="card-body">
                    <h5 className="card-title">{trackName}</h5>
                    <p className="card-text">Album: {albumName}</p>
                    <p className="card-text">Artist: {trackArtist}</p>
                    <p className="card-text">Duration: {trackDuration}</p>
                    <p className="card-text">Popularity: {trackPopularity}</p>
                </div>
                <div className="card-body">
                    <Link to="/" type="button" className="btn buttons mx-3">Add Artist to Board</Link>
                </div>
            </div>
        </div>
    </>
}

export default TrackCard;