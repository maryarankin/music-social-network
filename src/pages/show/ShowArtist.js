/* artist show page */

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../Context';
import ArtistCard from '../../components/ArtistCard';
import Album from '../../components/Album';
const axios = require('axios');

const ShowArtist = () => {
    const { id } = useParams();
    const { accessToken } = useContext(Context);

    const [artistName, setArtistName] = useState('');
    const [artistImage, setArtistImage] = useState('');
    const [artistGenre, setArtistGenre] = useState('');
    const [artistFollowers, setArtistFollowers] = useState();
    const [artistPopularity, setArtistPopularity] = useState();
    const [artistAlbums, setArtistAlbums] = useState([]);
    const [artistTopTracks, setArtistTopTracks] = useState([]);
    const [relatedArtists, setRelatedArtists] = useState([]);

    let albums = [];
    let topTracks = [];
    let relatedArt = [];

    const getArtist = (accessToken, id) => {
        let options = {
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

    const getArtistAlbums = (accessToken, id, albums) => {
        let options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/artists/${id}/albums?market=US&limit=50&include_groups=album`,
            headers: {
                'content-type': 'application/json', authorization: 'Bearer ' + accessToken
            }
        };

        axios.request(options).then(function (response) {
            //remove duplicate albums with same name
            response.data.items.forEach((album) => {
                if ((albums.find(element => element.name === album.name)) === undefined) {
                    albums.push(album);
                }
            })
            setArtistAlbums(albums);
        }).catch(function (error) {
            console.error(error);
        });
    }

    const getArtistTopTracks = (accessToken, id) => {
        let options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`,
            headers: {
                'content-type': 'application/json', authorization: 'Bearer ' + accessToken
            }
        };

        axios.request(options).then(function (response) {
            //limit top tracks to 5
            for (let i = 0; i < 5; i++) {
                topTracks.push(response.data.tracks[i]);
            }
            setArtistTopTracks(topTracks);
        }).catch(function (error) {
            console.error(error);
        });
    }

    const getRelatedArtists = (accessToken, id) => {
        let options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/artists/${id}/related-artists`,
            headers: {
                'content-type': 'application/json', authorization: 'Bearer ' + accessToken
            }
        };

        axios.request(options).then(function (response) {
            //limit related artists to 5
            for (let i = 0; i < 5; i++) {
                relatedArt.push(response.data.artists[i]);
            }
            setRelatedArtists(relatedArt);
        }).catch(function (error) {
            console.error(error);
        });
    }

    useEffect(() => {
        getArtist(accessToken, id);
        getArtistAlbums(accessToken, id, albums);
        getArtistTopTracks(accessToken, id);
        getRelatedArtists(accessToken, id);
    }, [id])

    return <div>
        <div className="row">
            <div className="col-lg-3 col-sm-12">
                <ArtistCard artistName={artistName} artistImage={artistImage} artistGenre={artistGenre} artistFollowers={artistFollowers} artistPopularity={artistPopularity} artistTopTracks={artistTopTracks} relatedArtists={relatedArtists} />
            </div>

            <div className="col-lg-9 col-sm-12 d-flex justify-content-center">
                <div className="taste-board">
                    <div className="row mt-5 mx-4">
                        {artistAlbums.map((album) => {
                            return <div className="col-xl-4 col-xs-12 mb-5" key={album.id}>
                                <Album {...album} />
                            </div>
                        })}
                    </div>
                </div>
            </div>

        </div>
    </div>
}

export default ShowArtist;