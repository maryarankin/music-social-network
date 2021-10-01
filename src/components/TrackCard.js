import React from 'react';
import { Link } from 'react-router-dom';

const TrackCard = ({ trackName, albumCover, trackArtist, albumName, trackDuration, trackPopularity, artistId, albumId }) => {
    let minutes = trackDuration / 60000;
    let min = Math.floor(minutes);
    let sec = Math.floor((minutes * 60) % 60);
    let duration = min + ':' + sec;

    return <>
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card profile-card d-flex justify-content-center" style={{ width: '40rem' }}>
                <img src={albumCover} className="card-img-top album-cover mt-4" alt={albumName} />
                <div className="card-body">
                    <h5 className="card-title">{trackName}</h5>
                    <p className="card-text">Album: <Link to={`/album/${albumId}`} className="track-page-link">{albumName}</Link></p>
                    <p className="card-text">Artist: <Link to={`/artist/${artistId}`} className="track-page-link">{trackArtist}</Link></p>
                    <p className="card-text">Duration: {duration}</p>
                    <p className="card-text">Popularity: {trackPopularity}</p>
                </div>
                <div className="card-body">
                    <Link to="/" type="button" className="btn buttons mx-3">Add Track to Board</Link>
                </div>
            </div>
        </div>
    </>
}

export default TrackCard;