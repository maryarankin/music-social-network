import React, { useState, useEffect } from 'react';
const axios = require('axios');
//import { querySpotify } from '../data/querySpotify';

const SearchBar = (props) => {
    let searchType = props.searchType;
    let accessToken = props.accessToken;

    let searchTypeString = searchType;
    searchTypeString = searchTypeString.charAt(0).toUpperCase() + searchTypeString.substring(1);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (searchTerm) {
            setSearchQuery(searchTerm);
            setSearchTerm('');
            //setSearchResults(querySpotify(accessToken, searchType, searchQuery));

            //put the api call into separate file (ie, querySpotify.js file)
            let options = {
                method: 'GET',
                url: `https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchType}&market=US&limit=10`,
                headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken }
            };

            axios.request(options).then(function (response) {
                console.log(response.data);
                return response.data;
            }).catch(function (error) {
                console.error(error);
            });
        }
    }

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
