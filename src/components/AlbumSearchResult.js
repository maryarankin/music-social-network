import React from 'react';

const AlbumSearchResult = ({ artists, images, name, release_date, id }) => {
    return <>
        <div className="card">
            <div className="card-body">
                {name}
            </div>
        </div>
    </>
}

//artists, images, name, release_date, total_tracks, id

export default AlbumSearchResult;