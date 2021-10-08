import React from 'react';
import SearchBar from '../../components/SearchBar';

const AlbumSearch = ({ accessToken }) => {
    return <div>
        <SearchBar searchType="album" accessToken={accessToken} />
    </div>
}

export default AlbumSearch;