import React, { useState, useEffect } from 'react';
import { querySpotify } from '../data/querySpotify';
const axios = require('axios');


const SearchBar = (props) => {
    let searchType = props.searchType;
    let accessToken = props.accessToken;

    let searchTypeString = searchType;
    searchTypeString = searchTypeString.charAt(0).toUpperCase() + searchTypeString.substring(1);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (searchTerm) {
            setLoading(true);

            console.log("access token: " + accessToken + "; search type: " + searchType + "; search query: " + searchTerm)

            let queryResults = await querySpotify(accessToken, searchType, searchTerm);
            console.log("query results: " + queryResults);

            //await updateSearchResults(queryResults);

            setSearchTerm('');
        }
    }

    // const updateSearchResults = async (queryResults) => {
    //     await setSearchResults(queryResults);
    //     console.log("search results: " + searchResults);
    // }

    useEffect(() => {
        setLoading(false);
    }, [searchResults])

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