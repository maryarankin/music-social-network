import React from 'react';

const TrackSearchResult = ({ album, artists, name, id }) => {
    return <h1>{name}, {album.images[0].url}</h1>
}

//album, artists, duration, name, popularity, id

export default TrackSearchResult;