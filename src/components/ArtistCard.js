import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');

const ArtistCard = ({ artistName, artistImage, artistGenre, artistFollowers, artistPopularity, artistAlbums }) => {
    return <>
        <div className="container mt-5">
            <div className="card profile-card d-flex justify-content-center" style={{ width: '18rem' }}>
                <img src={artistImage} className="card-img-top profile-picture mt-2" alt={artistName} />
                <div className="card-body">
                    <h5 className="card-title">{artistName}</h5>
                    <p className="card-text">Genre: {artistGenre}</p>
                    <p className="card-text">Followers: {artistFollowers}</p>
                    <p className="card-text">Popularity: {artistPopularity}</p>
                </div>
                <ul className="list-group list-group-flush">
                    {artistAlbums.map((album) => {
                        return <li key={album.id} className="list-group-item">{album.name} ({album.release_date.substring(0, 4)})</li>
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