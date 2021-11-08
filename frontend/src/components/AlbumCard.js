/* card component for album info on album show page */

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AlbumCard = ({ id, albumName, albumCover, albumArtist, albumArtistId, albumReleaseDate, albumPopularity }) => {
    const addAlbumToProfile = async () => {
        await axios.post('/api/faves/albums', {
            albumId: id
        });
    }

    return <>
        <div className="container mt-5 mx-5 d-flex justify-content-center">
            <div className="card album-card d-flex justify-content-center" style={{ width: '75%' }}>
                <img src={albumCover} className="card-img-top album-cover mt-4" alt={albumName} />
                <div className="card-body">
                    <h5 className="card-title mb-3">{albumName}</h5>
                    <p>Artist: <Link to={`/artist/${albumArtistId}`} className="card-text album-card-artist-link">{albumArtist}</Link></p>
                    <p className="card-text">Release Date: {albumReleaseDate.substring(0, 4)}</p>
                    <p className="card-text">Popularity: {albumPopularity}</p>
                </div>
                <div className="card-body">
                    <button onClick={addAlbumToProfile} type="button" className="btn buttons mb-3">Add Album</button>
                </div>
            </div>
        </div>
    </>
}

export default AlbumCard;