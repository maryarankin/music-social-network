import React from 'react';
import { Link } from 'react-router-dom';

const ArtistCard = ({ artistName, artistPicture, artistGenre, artistAlbums, artistSongs }) => {
    return <>
        <div className="container mt-5">
            <div className="card profile-card d-flex justify-content-center" style={{ width: '18rem' }}>
                <img src={artistPicture} className="card-img-top profile-picture mt-2" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{artistName}</h5>
                    <p className="card-text">Genre: {artistGenre}</p>
                </div>
                <ul className="list-group list-group-flush">
                    {artistAlbums.map((album) => {
                        return <li key={album.id} className="list-group-item">{album.albumName} ({album.albumYear})</li>
                    })}
                </ul>
                <div className="card-body">
                    <Link to="/" type="button" className="btn buttons mx-3">Add Artist to Board</Link>
                </div>
            </div>
        </div>
    </>
}

export default ArtistCard;