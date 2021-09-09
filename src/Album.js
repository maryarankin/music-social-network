/* Album component that will display the title, artist, release year, and cover art */

import React, { useState } from 'react';
import defaultAlbumCover from './assets/default-album-cover.png';

const Album = () => {
    const [albumTitle, setAlbumTitle] = useState('Album Title');
    const [albumArtist, setAlbumArtist] = useState('Artist');
    const [albumYear, setAlbumYear] = useState(2000);
    const [albumCover, setAlbumCover] = useState('Image'); //put a generic image url here in case the api doesn't retrieve an image

    return (
        <>
            <img src={defaultAlbumCover} />
            <div>
                <p>Title: {albumTitle}</p>
                <p>Artist: {albumArtist}</p>
                <p>({albumYear})</p>
            </div>
        </>
    )
}

export default Album;