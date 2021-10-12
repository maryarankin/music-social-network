/* album show page */

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../Context';
import AlbumCard from '../../components/AlbumCard';
import Track from '../../components/Track';
const axios = require('axios');

const ShowAlbum = () => {
    const { id } = useParams();
    const { accessToken } = useContext(Context);

    const [albumName, setAlbumName] = useState('');
    const [albumCover, setAlbumCover] = useState('');
    const [albumArtist, setAlbumArtist] = useState('');
    const [albumArtistId, setAlbumArtistId] = useState('');
    const [albumTracks, setAlbumTracks] = useState([]);
    const [albumReleaseDate, setAlbumReleaseDate] = useState('');
    const [albumPopularity, setAlbumPopularity] = useState(0);

    const getAlbum = (accessToken, id) => {
        let options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/albums/${id}`,
            headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken }
        };

        axios.request(options).then(function (response) {
            setAlbumName(response.data.name);
            setAlbumCover(response.data.images[0].url);
            setAlbumArtist(response.data.artists[0].name);
            setAlbumArtistId(response.data.artists[0].id);
            setAlbumTracks(response.data.tracks.items);
            setAlbumReleaseDate(response.data.release_date);
            setAlbumPopularity(response.data.popularity);
        }).catch(function (error) {
            console.error(error);
        });
    }

    useEffect(() => {
        getAlbum(accessToken, id);
    }, [])

    return <div>
        <div className="row">
            <div className="col-lg-3 col-sm-12">
                <AlbumCard albumName={albumName} albumCover={albumCover} albumArtist={albumArtist} albumArtistId={albumArtistId} albumReleaseDate={albumReleaseDate} albumPopularity={albumPopularity} />
            </div>

            <div className="col-lg-9 col-sm-12 d-flex justify-content-center">
                <div className="taste-board">
                    <div className="row mt-5 mx-4">
                        {albumTracks.map((track) => {
                            return <div className="col-xl-4 col-xs-12 mb-5" key={track.id}>
                                <Track {...track} />
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default ShowAlbum;

