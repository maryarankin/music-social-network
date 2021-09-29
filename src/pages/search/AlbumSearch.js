import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';

const AlbumSearch = (props) => {
    let accessToken = props.accessToken;

    const [search, setSearch] = useState('');

    return <div>
        <SearchBar searchType="album" accessToken={accessToken} passSearch={setSearch} />
    </div>
}

export default AlbumSearch;