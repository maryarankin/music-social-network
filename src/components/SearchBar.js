import React, { useState, useEffect } from 'react';
import { querySpotify } from '../data/querySpotify';

const SearchBar = (props) => {
    let searchType = props.searchType;
    let accessToken = props.accessToken;

    let searchTypeString = searchType;
    searchTypeString = searchTypeString.charAt(0).toUpperCase() + searchTypeString.substring(1);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (searchTerm) {
            setSearchQuery(searchTerm);
            setSearchTerm('');
        }
    }

    useEffect(() => {
        let searchResults = querySpotify(accessToken, searchType, searchQuery);
        console.log(searchResults);
    }, [searchQuery])

    return <div className="container mt-5">
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="searchTerm">{searchTypeString} Name: </label>
                <input className="mx-3" type="text" id="searchTerm" name="searchTerm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
                <button className="btn-sm buttons">Search</button>
            </form>
        </div>
    </div>
}

export default SearchBar;
