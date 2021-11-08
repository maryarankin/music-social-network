/* Profile page where all of a user's information is shown; also where they can display their favorite albums, songs, and artists */

import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../Context';
import FaveAlbum from '../components/FaveAlbum';
import FaveTrack from '../components/FaveTrack';
import FaveArtist from '../components/FaveArtist';
//import { albumData } from '../data/albumData';
import ProfileCard from '../components/ProfileCard';
const axios = require('axios');

const Profile = () => {
    const { accessToken } = useContext(Context);

    const [favoriteAlbum, setFavoriteAlbum] = useState('');
    const [favoriteTrack, setFavoriteTrack] = useState('');
    const [favoriteArtist, setFavoriteArtist] = useState('');

    /* GET FAVORITE ALBUMS */

    const [albumName, setAlbumName] = useState('');
    const [albumCover, setAlbumCover] = useState('');

    const getAlbum = (accessToken, id) => {
        let options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/albums/${id}`,
            headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken }
        };

        axios.request(options).then(function (response) {
            setAlbumName(response.data.name);
            setAlbumCover(response.data.images[0].url);
            //setIsError(false);
        }).catch(function (error) {
            console.error(error);
            //setIsError(true);
        });
    }

    useEffect(() => {
        fetch('/api/users').then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonResponse => {
            setFavoriteAlbum(jsonResponse[0].favoriteAlbums);
            //setFavoriteArtist(jsonResponse[0].favoriteArtists);
        }).then(() => {
            getAlbum(accessToken, favoriteAlbum);
        })
    }, [favoriteAlbum])

    /* GET FAVORITE TRACKS */

    const [trackName, setTrackName] = useState('');
    const [trackAlbumCover, setTrackAlbumCover] = useState('');
    const [trackAlbumId, setTrackAlbumId] = useState('');

    const getTrack = (accessToken, id) => {
        let options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/tracks/${id}`,
            headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken }
        };

        axios.request(options).then(function (response) {
            setTrackName(response.data.name);
            setTrackAlbumCover(response.data.album.images[0].url);
            setTrackAlbumId(response.data.album.id);
        }).catch(function (error) {
            console.error(error);
        });
    }

    useEffect(() => {
        fetch('/api/users').then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonResponse => {
            setFavoriteTrack(jsonResponse[0].favoriteTracks);
        }).then(() => {
            getTrack(accessToken, favoriteTrack);
        })
    }, [favoriteTrack])

    /* GET FAVORITE ARTISTS */

    const [artistName, setArtistName] = useState('');
    const [artistImage, setArtistImage] = useState('');

    const getArtist = (accessToken, id) => {
        let options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/artists/${id}`,
            headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken }
        };

        axios.request(options).then(function (response) {
            setArtistName(response.data.name);
            setArtistImage(response.data.images[0].url);
        }).catch(function (error) {
            console.error(error);
            //setIsError(true);
        });
    }

    useEffect(() => {
        fetch('/api/users').then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonResponse => {
            setFavoriteArtist(jsonResponse[0].favoriteArtists);
        }).then(() => {
            getArtist(accessToken, favoriteArtist);
        })
    }, [favoriteArtist])

    return (
        <>
            <div>
                <div className="row mb-5">

                    <div className="col-9 d-flex justify-content-center">

                        <div className="grid">
                            <div className="row mt-5 mx-4">
                                <h1 className="favorite-title mb-4">favorite artists</h1>
                                <FaveArtist id={favoriteArtist} name={artistName} image={artistImage} />
                            </div>

                            <div className="row mt-5 mx-4">
                                <h1 className="favorite-title mb-4">favorite tracks</h1>
                                <FaveTrack name={trackName} albumCover={trackAlbumCover} albumId={trackAlbumId} />
                            </div>

                            <div className="row mt-5 mx-4">
                                <h1 className="favorite-title mb-4">favorite albums</h1>
                                <FaveAlbum id={favoriteAlbum} image={albumCover} name={albumName} />
                            </div>
                        </div>
                    </div>


                    <div className="col">
                        <ProfileCard />
                    </div>

                </div>
            </div>



        </>
    )
}

export default Profile;