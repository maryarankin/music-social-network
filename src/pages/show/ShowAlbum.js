import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AlbumCard from '../../components/AlbumCard';
const axios = require('axios');

const ShowAlbum = ({ accessToken }) => {
    const { id } = useParams();

    const [albumName, setAlbumName] = useState('');
    const [albumCover, setAlbumCover] = useState('');
    const [albumArtist, setAlbumArtist] = useState('');
    const [albumTracks, setAlbumTracks] = useState([]);
    const [albumReleaseDate, setAlbumReleaseDate] = useState('');
    const [albumPopularity, setAlbumPopularity] = useState(0);

    const getArtist = (accessToken, id) => {
        var options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/albums/${id}`,
            headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken }
        };

        axios.request(options).then(function (response) {
            setAlbumName(response.data.name);
            setAlbumCover(response.data.images[0].url);
            setAlbumArtist(response.data.artists[0].name);
            setAlbumTracks(response.data.tracks.items);
            setAlbumReleaseDate(response.data.release_date);
            setAlbumPopularity(response.data.popularity);
        }).catch(function (error) {
            console.error(error);
        });
    }

    useEffect(() => {
        getArtist(accessToken, id);
    }, [])

    return <div>
        <div className="row">
            <div className="col-5 mx-5">
                <AlbumCard albumName={albumName} albumCover={albumCover} albumArtist={albumArtist} albumReleaseDate={albumReleaseDate} albumPopularity={albumPopularity} />
            </div>

            <div className="col-6 mt-5">
                <div className="card border-dark" style={{ width: '50rem' }}>
                    <div className="card-header border-dark">
                        Track Listing
                    </div>
                    <ul className="list-group list-group-flush">
                        {albumTracks.map((track, index) => {
                            return <li key={track.id} className="list-group-item">
                                <div className="row">
                                    <div className="col-11">
                                        {index + 1}. {track.name}
                                    </div>
                                    <div className="col-1 d-flex justify-content-end">
                                        <Link to="" className="btn buttons btn-sm">+</Link>
                                    </div>
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
            </div>

        </div>
    </div>
}

export default ShowAlbum;

