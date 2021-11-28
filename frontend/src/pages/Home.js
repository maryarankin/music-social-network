/* Home page */

import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../Context';
import HomepageBlurb from '../components/HomepageBlurb';
import { homepageData } from '../data/homepageData';
import TopSong from '../components/TopSong';
const axios = require('axios');

const Home = () => {
    const { accessToken } = useContext(Context);
    const [topTracks, setTopTracks] = useState([]);

    const getPlaylist = (accessToken, id) => {
        let options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/playlists/${id}`,
            headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken }
        };

        axios.request(options).then(function (response) {
            setTopTracks(response.data.tracks.items);
        }).catch(function (error) {
            console.error(error);
            //setIsError(true);
        });
    }

    useEffect(() => {
        getPlaylist(accessToken, '37i9dQZEVXbLp5XoPON0wI');
    }, [])

    return <>
        <div className="container mt-5">
            <div className="title-div mx-auto">
                <h1 className="main-title text-start d-none d-xl-block">welcome to</h1>
                <h1 className="main-title text-end d-none d-xl-block">music mates</h1>

                <h1 className="main-title-small text-start d-xl-none">welcome to</h1>
                <h1 className="main-title-small text-end d-xl-none">music mates</h1>
            </div>

            <div className="container">
                <div className="row">
                    {homepageData.map((data) => {
                        return <div className="col-12 col-md-4" key={data.id}>
                            <HomepageBlurb {...data} />
                        </div>
                    })}
                </div>
            </div>
        </div>

        <div className="top-songs pb-5">
            <div className="mx-auto mt-5 top-50">
                <h1 className="top-50-title text-center pt-5">USA Top 50</h1>
                <div className="row">
                    {topTracks.map((track) => {
                        return <div className="col-2" key={track.track.id}>
                            <TopSong id={track.track.id} albumId={track.track.album.id} artists={track.track.artists} images={track.track.album.images} name={track.track.name} />
                        </div>
                    })}
                </div>
            </div>
        </div>
    </>
}

export default Home;