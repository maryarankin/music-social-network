import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArtistCard from '../../components/ArtistCard';
const axios = require('axios');
//import ArtistCard from '../../components/ArtistCard'
//import { artistData } from '../data/artistData'


//GET ARTIST'S TOP SONGS


const ShowArtist = ({ accessToken }) => {
    const { id } = useParams();

    const [artistName, setArtistName] = useState('');
    const [artistImage, setArtistImage] = useState('');
    const [artistGenre, setArtistGenre] = useState('');
    const [artistFollowers, setArtistFollowers] = useState();
    const [artistPopularity, setArtistPopularity] = useState();
    const [artistAlbums, setArtistAlbums] = useState([]);
    const [artistTopSongs, setArtistTopSongs] = useState([]);

    const getArtist = (accessToken, id) => {
        var options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/artists/${id}`,
            headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken }
        };

        axios.request(options).then(function (response) {
            setArtistName(response.data.name);
            setArtistImage(response.data.images[0].url);
            setArtistGenre(response.data.genres[0]);
            setArtistFollowers(response.data.followers.total);
            setArtistPopularity(response.data.popularity);
        }).catch(function (error) {
            console.error(error);
        });
    }

    const getArtistAlbums = (accessToken, id) => {
        var options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/artists/${id}/albums?market=US&limit=10&include_groups=album`,
            headers: {
                'content-type': 'application/json', authorization: 'Bearer ' + accessToken
            }
        };

        axios.request(options).then(function (response) {
            setArtistAlbums(response.data.items);
        }).catch(function (error) {
            console.error(error);
        });
    }

    useEffect(() => {
        getArtist(accessToken, id);
        getArtistAlbums(accessToken, id);
    }, [])

    return <>
        <ArtistCard artistName={artistName} artistImage={artistImage} artistGenre={artistGenre} artistFollowers={artistFollowers} artistPopularity={artistPopularity} artistAlbums={artistAlbums} />
    </>
}

export default ShowArtist;