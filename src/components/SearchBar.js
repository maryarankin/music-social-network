import React, { useState, useEffect, useRef } from 'react';
import { querySpotify } from '../data/querySpotify';
const axios = require('axios');


const SearchBar = ({ searchType, accessToken }) => {
    let searchTypeString = searchType;
    searchTypeString = searchTypeString.charAt(0).toUpperCase() + searchTypeString.substring(1);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState();

    const [foundResults, setFoundResults] = useState(false);
    const [error, setError] = useState();

    //let queryResults = '';

    const useFirstRender = () => {
        const firstRender = useRef(true);

        useEffect(() => {
            firstRender.current = false;
        }, []);

        return firstRender.current;
    }

    const firstRender = useFirstRender();

    const handleSubmit = async (e, passSearch) => {
        e.preventDefault();

        if (searchTerm) {
            //setLoading(true);
            setSearchQuery(searchTerm);

            console.log("access token: " + accessToken + "; search type: " + searchType + "; search query: " + searchQuery)

            //setSearchResults(await querySpotify(accessToken, searchType, searchTerm));
            //console.log("query results: " + searchResults);

            //passSearch(queryResults);

            //await updateSearchResults(queryResults);

            setSearchTerm('');
        }
    }

    useEffect(() => {
        setSearchResults(querySpotify(accessToken, searchType, searchTerm));
        console.log("query results: " + searchResults);
        if (!firstRender) {
            setFoundResults(true);
        }
    }, [searchQuery])

    // const updateSearchResults = async (queryResults) => {
    //     await setSearchResults(queryResults);
    //     console.log("search results: " + searchResults);
    // }

    // useEffect(() => {
    //     setLoading(false);
    // }, [searchResults])

    return <div className="container mt-5">
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="searchTerm">{searchTypeString} Name: </label>
                <input className="mx-3" type="text" id="searchTerm" name="searchTerm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
                <button className="btn-sm buttons">Search</button>
            </form>
        </div>

        {foundResults && <h1>hi</h1>}
    </div>
}

export default SearchBar;