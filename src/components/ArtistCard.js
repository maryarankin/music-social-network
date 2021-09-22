import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');

const ArtistCard = ({ accessToken }) => {

    const [artistId, setArtistId] = useState('');
    const [artistSearch, setArtistSearch] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (artistId) {
            setArtistSearch(artistId);
            setArtistId('');
        }
    }

    const [artistName, setArtistName] = useState('');
    const [artistPicture, setArtistPicture] = useState('');
    const [artistGenre, setArtistGenre] = useState('');
    const [artistAlbums, setArtistAlbums] = useState([]);

    const getArtist = (accessToken, artistSearch) => {
        var options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/artists/${artistSearch}`,
            headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken }
        };

        axios.request(options).then(function (response) {
            setArtistName(response.data.name);
            setArtistPicture(response.data.images[0].url);
            setArtistGenre(response.data.genres[0]);
            //console.log(response.data);
            //return response.data;
        }).catch(function (error) {
            console.error(error);
        });
    }

    const getArtistAlbums = (accessToken, artistSearch) => {
        var options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/artists/${artistSearch}/albums?market=US&limit=10&include_groups=album`,
            headers: {
                'content-type': 'application/json', authorization: 'Bearer ' + accessToken
            }
        };

        axios.request(options).then(function (response) {
            setArtistAlbums(response.data.items);
            console.log(response.data);
            //return response.data;
        }).catch(function (error) {
            console.error(error);
        });
    }

    useEffect(() => {
        getArtist(accessToken, artistSearch);
        getArtistAlbums(accessToken, artistSearch);
    }, [artistSearch])

    return <>
        <div className="container mt-5">
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="artistId">Artist ID: </label>
                    <input className="mx-3" type="text" id="artistId" name="artistId" value={artistId} onChange={(e) => setArtistId(e.target.value)}></input>
                    <button className="btn-sm buttons">Search</button>
                </form>
            </div>

            {artistSearch &&
                <div className="card profile-card d-flex justify-content-center" style={{ width: '18rem' }}>
                    <img src={artistPicture} className="card-img-top profile-picture mt-2" alt={artistName} />
                    <div className="card-body">
                        <h5 className="card-title">{artistName}</h5>
                        <p className="card-text">Genre: {artistGenre}</p>
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
            }
        </div>
    </>

}

export default ArtistCard;