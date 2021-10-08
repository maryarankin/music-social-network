import React from 'react';
import SearchBar from '../../components/SearchBar';

const TrackSearch = ({ accessToken }) => {
    return <div>
        <SearchBar searchType="track" accessToken={accessToken} />
    </div>
}

export default TrackSearch;