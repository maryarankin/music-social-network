/* search bar component that queries spotify & returns results */

import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../Context';
import SearchResult from './SearchResult';
const axios = require('axios');


const SearchBar = ({ searchType }) => {
    const { accessToken } = useContext(Context);

    let searchTypeString = searchType;
    searchTypeString = searchTypeString.charAt(0).toUpperCase() + searchTypeString.substring(1);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [moreThanOneResult, setMoreThanOneResult] = useState(true);

    //const [foundResults, setFoundResults] = useState(false);
    //const [error, setError] = useState();

    //let queryResults = '';

    // const useFirstRender = () => {
    //     const firstRender = useRef(true);

    //     useEffect(() => {
    //         firstRender.current = false;
    //     }, []);

    //     return firstRender.current;
    // }

    // const firstRender = useFirstRender();

    //let queryResults = '';

    const handleSubmit = (e) => {
        e.preventDefault();

        if (searchTerm) {
            //setLoading(true);
            //setSearchQuery(searchTerm);

            //console.log("search query: " + searchQuery)

            //setSearchResults(await querySpotify(accessToken, searchType, searchTerm));
            //console.log("query results: " + searchResults);

            //passSearch(queryResults);

            //await updateSearchResults(queryResults);

            // queryResults = await querySpotify(accessToken, searchType, searchTerm);
            //console.log("query results: " + queryResults)

            //setSearchResults(queryResults);
            //console.log(searchResults);

            setSearchQuery(searchTerm);

            setSearchTerm('');
        }
    }

    const querySpotify = (accessToken, searchType, searchQuery) => {
        let options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchType}&market=US&limit=12`,
            headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken }
        };

        axios.request(options).then(function (response) {
            if (searchType === 'artist') {
                setSearchResults(response.data.artists.items);
                if (response.data.artists.items.length === 0) {
                    setNoResults(true);
                    setMoreThanOneResult(false);
                }
                else if (response.data.artists.items.length === 1) {
                    setNoResults(false);
                    setMoreThanOneResult(false);
                }
                else {
                    setNoResults(false);
                    setMoreThanOneResult(true);
                }
            }
            else if (searchType === 'album') {
                setSearchResults(response.data.albums.items);
                if (response.data.artists.items.length === 0) {
                    setNoResults(true);
                    setMoreThanOneResult(false);
                }
                else if (response.data.artists.items.length === 1) {
                    setNoResults(false);
                    setMoreThanOneResult(false);
                }
                else {
                    setNoResults(false);
                    setMoreThanOneResult(true);
                }
            }
            else {
                setSearchResults(response.data.tracks.items);
                if (response.data.artists.items.length === 0) {
                    setNoResults(true);
                    setMoreThanOneResult(false);
                }
                else if (response.data.artists.items.length === 1) {
                    setNoResults(false);
                    setMoreThanOneResult(false);
                }
                else {
                    setNoResults(false);
                    setMoreThanOneResult(true);
                }
            }
        }).catch(function (error) {
            console.error(error);
        });
    }

    useEffect(() => {
        querySpotify(accessToken, searchType, searchQuery);
    }, [searchQuery])

    // useEffect(() => {
    //     setSearchResults(querySpotify(accessToken, searchType, searchQuery));
    //     console.log("query results: " + searchResults);
    //     if (!firstRender) {
    //         setFoundResults(true);
    //     }
    // }, [searchQuery])

    // const updateSearchResults = async (queryResults) => {
    //     await setSearchResults(queryResults);
    //     console.log("search results: " + searchResults);
    // }

    // useEffect(() => {
    //     setLoading(false);
    // }, [searchResults])

    return <div className="container mt-5">
        <form onSubmit={handleSubmit}>
            <label htmlFor="searchTerm">{searchTypeString} Name: </label>
            <input className="mx-3" type="text" id="searchTerm" name="searchTerm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
            <button className="btn-sm buttons">Search</button>
        </form>

        {noResults && <h1>no results</h1>}

        {(!noResults && searchQuery && moreThanOneResult) && <div className="d-flex justify-content-center">
            <div className="row mt-5">
                {searchResults.map((result) => {
                    return <div className="col-12 col-md-6 col-lg-4 mb-5" key={result.id}>
                        <SearchResult {...result} searchType={searchType} />
                    </div>
                })}
            </div>
        </div>
        }

        {(!noResults && searchQuery && !moreThanOneResult) && <div className="d-flex justify-content-center">
            <div className="row mt-5">
                {searchResults.map((result) => {
                    return <div className="col-12 mb-5" key={result.id}>
                        <SearchResult {...result} searchType={searchType} />
                    </div>
                })}
            </div>
        </div>
        }

    </div >
}

export default SearchBar;
