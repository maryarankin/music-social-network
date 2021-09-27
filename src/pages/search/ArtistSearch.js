import React from 'react';
import SearchBar from '../../components/SearchBar';

const ArtistSearch = (props) => {
    let accessToken = props.accessToken;

    return <div>
        <SearchBar searchType="artist" accessToken={accessToken} />
    </div>
}

export default ArtistSearch;