import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

    return <>
        <AlbumCard albumName={albumName} albumCover={albumCover} albumArtist={albumArtist} albumTracks={albumTracks} albumReleaseDate={albumReleaseDate} albumPopularity={albumPopularity} />
    </>
}

export default ShowAlbum;