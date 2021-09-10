/* Album component that will display the title, artist, release year, and cover art */

import React from 'react';
import defaultAlbumCover from './assets/default-album-cover.png';

const Album = ({ id, albumTitle, albumArtist, albumYear, albumCover }) => {
    return (
        <>
            <img src={albumCover || defaultAlbumCover} />
            <div>
                <p>Title: {albumTitle}</p>
                <p>Artist: {albumArtist}</p>
                <p>({albumYear})</p>
            </div>
        </>
    )
}

export default Album;