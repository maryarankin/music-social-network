import React, { useState, useEffect, useRef } from 'react';
import { querySpotify } from '../data/querySpotify';
// import ArtistSearchResult from './ArtistSearchResult';
// import AlbumSearchResult from './ArtistSearchResult';
// import TrackSearchResult from './ArtistSearchResult';
import SearchResult from './SearchResult';
const axios = require('axios');


const SearchBar = ({ searchType, accessToken }) => {
    console.log(accessToken)
    let searchTypeString = searchType;
    searchTypeString = searchTypeString.charAt(0).toUpperCase() + searchTypeString.substring(1);

    //create booleans for searchType:
    let isArtist = false;
    let isAlbum = false;
    let isTrack = false;

    if (searchType == 'artist') {
        isArtist = true;
    }
    else if (searchType == 'album') {
        isAlbum = true;
    }
    else {
        isTrack = true;
    }

    console.log("album: " + isAlbum + "; artist: " + isArtist + "; track: " + isTrack);

    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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
            url: `https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchType}&market=US&limit=10`,
            headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken }
        };

        // axios.request(options).then(function (response) {
        //     console.log(response.data);
        //     return response.data;
        // }).catch(function (error) {
        //     console.error(error);
        // }); 

        axios.request(options).then(function (response) {
            if (searchType == 'artist') {
                setSearchResults(response.data.artists.items);
            }
            else if (searchType == 'album') {
                setSearchResults(response.data.albums.items);
            }
            else {
                setSearchResults(response.data.tracks.items);
            }

            console.log(response.data);
            //return response.data;
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

        {searchQuery && <div className="d-flex justify-content-center">
            <div className="row mt-5">
                {searchResults.map((result) => {
                    return <div className="col-4 mb-5" key={result.id}>
                        <SearchResult {...result} searchType={searchType} />
                    </div>
                })}
            </div>
        </div>
        }

    </div >
}

export default SearchBar;
