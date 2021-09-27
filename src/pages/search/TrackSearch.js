import React from 'react';
import SearchBar from '../../components/SearchBar';

const TrackSearch = (props) => {
    let accessToken = props.accessToken;

    return <div>
        <SearchBar searchType="track" accessToken={accessToken} />
    </div>
}

export default TrackSearch;