/* NOTE: NOT USING THIS PAGE ANYMORE */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TrackCard from '../../components/TrackCard';
const axios = require('axios');

const ShowTrack = ({ accessToken }) => {
    const { id } = useParams();

    const [trackName, setTrackName] = useState('');
    const [albumCover, setAlbumCover] = useState('');
    const [trackArtist, setTrackArtist] = useState([]);
    const [albumName, setAlbumName] = useState('');
    const [trackDuration, setTrackDuration] = useState('');
    const [trackPopularity, setTrackPopularity] = useState(0);
    const [artistId, setArtistId] = useState(0);
    const [albumId, setAlbumId] = useState(0);

    const getArtist = (accessToken, id) => {
        let options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/tracks/${id}`,
            headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken }
        };

        axios.request(options).then(function (response) {
            setTrackName(response.data.name);
            setAlbumCover(response.data.album.images[0].url);
            setTrackArtist(response.data.artists[0].name);
            setAlbumName(response.data.album.name);
            setTrackDuration(response.data.duration_ms);
            setTrackPopularity(response.data.popularity);
            setArtistId(response.data.artists[0].id);
            setAlbumId(response.data.album.id);
        }).catch(function (error) {
            console.error(error);
        });
    }

    useEffect(() => {
        getArtist(accessToken, id);
    }, [])

    return <div>
        <TrackCard trackName={trackName} albumCover={albumCover} trackArtist={trackArtist} albumName={albumName} trackDuration={trackDuration} trackPopularity={trackPopularity} artistId={artistId} albumId={albumId} />
    </div>
}

export default ShowTrack;