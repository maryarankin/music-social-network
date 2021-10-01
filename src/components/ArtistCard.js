import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ArtistCard = ({ artistName, artistImage, artistGenre, artistFollowers, artistPopularity }) => {
    return <>
        <div className="container mt-5 mx-5">
            <div className="card profile-card d-flex justify-content-center" style={{ width: '25rem' }}>
                <img src={artistImage} className="card-img-top profile-picture mt-2" alt={artistName} />
                <div className="card-body">
                    <h5 className="card-title">{artistName}</h5>
                    <p className="card-text">Genre: {artistGenre}</p>
                    <p className="card-text">Followers: {artistFollowers}</p>
                    <p className="card-text">Popularity: {artistPopularity}</p>
                </div>
                <div className="card-body">
                    <Link to="/" type="button" className="btn buttons mx-3">Add Artist to Board</Link>
                </div>
            </div>
        </div>
    </>

}

export default ArtistCard;