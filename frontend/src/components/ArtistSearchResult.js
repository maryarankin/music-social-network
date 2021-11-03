/* not using anymore */

import React from 'react';

const ArtistSearchResult = ({ images, name, id }) => {
    return <>
        <div className="card">
            <div className="card-body">
                {name}, {id}
            </div>
        </div>
    </>
}

export default ArtistSearchResult;