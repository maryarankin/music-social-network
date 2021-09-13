/* Album component that will display the title, artist, release year, and cover art */

import React, { useState, useEffect } from 'react';
import defaultAlbumCover from '../assets/default-album-cover.png';

const Album = ({ id, albumTitle, albumArtist, albumYear, albumCover }) => {
    //later create a function that more dynamically shortens the title? or find a library for this?
    if (albumTitle.length > 21) {
        albumTitle = albumTitle.substring(0, 20) + '...';
    }

    return (
        <div className="card" style={{ width: '18rem' }}>
            <img src={albumCover || defaultAlbumCover} className="card-img-top" alt={albumTitle} />
            <div className="card-body">
                <h5 className="card-title album-title">{albumTitle} ({albumYear})</h5>
                <p className="card-text">{albumArtist}</p>
                <a href="#" className="btn buttons">View</a>
            </div>
        </div>
    )
}

export default Album;