/* Album component that will display the title, artist, release year, and cover art */

import React, { useState, useEffect } from 'react';
import defaultAlbumCover from './assets/default-album-cover.png';

const Album = ({ id, albumTitle, albumArtist, albumYear, albumCover }) => {
    //later create a function that more dynamically shortens the title? or find a library for this?
    if (albumTitle.length > 21) {
        albumTitle = albumTitle.substring(0, 20) + '...';
    }

    // thought I needed to use useState & useEffect b/c created truncateTitle function
    // created useEffect to call truncateTitle() but then the title wasn't updating
    // so created a useState for the title so it would re-render; this worked but was unnecessary;
    // I can just put the conditional statement above ^ outside of a function

    // original code:
    // const [displayedTitle, setDisplayedTitle] = useState(albumTitle);
    // const truncateTitle = () => {
    //     let newAlbumTitle = displayedTitle;
    //     if (newAlbumTitle.length > 21) {
    //         newAlbumTitle = newAlbumTitle.substring(0, 20) + '...';
    //     }
    //     setDisplayedTitle(newAlbumTitle);
    // }
    // useEffect(() => {
    //    truncateTitle();
    //}, [])

    return (
        <div class="card" style={{ width: '18rem' }}>
            <img src={albumCover || defaultAlbumCover} class="card-img-top" alt={albumTitle} />
            <div class="card-body">
                <h5 class="card-title">{albumTitle} ({albumYear})</h5>
                <p class="card-text">{albumArtist}</p>
                <a href="#" class="btn btn-dark">View</a>
            </div>
        </div>
    )
}

export default Album;