import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';
import defaultAlbumCoverDark from '../assets/default-album-cover-dark.png';
const axios = require('axios');

const Track = ({ track_number, name, duration_ms, id }) => {
    const { accessToken } = useContext(Context);

    let minutes = duration_ms / 60000;
    let min = Math.floor(minutes);
    let sec = Math.floor((minutes * 60) % 60);
    if (sec < 10) {
        sec = '0' + sec;
    }
    let duration = min + ':' + sec;

    if (name.length > 21) {
        name = name.substring(0, 20) + '...';
    }

    const [popularity, setPopularity] = useState(0);

    const getTrack = (accessToken, id) => {
        var options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/tracks/${id}/`,
            headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken }
        };

        axios.request(options).then(function (response) {
            setPopularity(response.data.popularity);
        }).catch(function (error) {
            console.error(error);
        });
    }

    useEffect(() => {
        getTrack(accessToken, id);
    }, [])

    return (
        <div className="card" style={{ width: '18rem' }}>
            <img src={defaultAlbumCoverDark} className="card-img-top album-cover my-4" alt={name} />
            <div className="card-body">
                <h5 className="card-title album-title">{track_number}. {name}</h5>
                <p className="card-text mt-3">Duration: {duration}</p>
                <p className="card-text">Popularity:</p>
                <div className="progress mb-3">
                    <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: `${popularity}%` }} aria-valuenow={popularity} aria-valuemin="0" aria-valuemax="100">{popularity}%</div>
                </div>
                <Link to="" className="btn buttons">+</Link>
            </div>
        </div>
    )
}

export default Track;