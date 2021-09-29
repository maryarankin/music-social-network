import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';

const AlbumSearch = (props) => {
    let accessToken = props.accessToken;



    return <div>
        <SearchBar searchType="album" accessToken={accessToken} />
    </div>
}

export default AlbumSearch;