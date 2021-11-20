/* component to display search results for artists, albums, or tracks */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from './firebase/FirebaseContext';
import { UserContext } from '../UserContext';
import { useAuth0 } from "@auth0/auth0-react";
import { ref, onValue } from 'firebase/database';
import { addArtistToProfile, addTrackToProfile, addAlbumToProfile } from '../functions/addFavorites';
import defaultAlbumCover from '../assets/default-album-cover.png';
import profilePicture from '../assets/profile-picture.png'
import Stars from './Stars';

const SearchResult = (props) => {
    const { isAuthenticated, isLoading } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    const { database } = useContext(FirebaseContext);

    let searchType = props.searchType;
    let name = props.name;
    let id = props.id;
    //let name = 'undefined';
    //let names = [];
    //let id = 0;

    // if (searchType !== 'user') {
    //     name = props.name;
    //     id = props.id;
    // }

    let image = '';
    let genre = '';
    let popularity = 0;
    let artist = '';
    let releaseDate = '';

    let isArtist = false;
    let isAlbum = false;
    let isTrack = false;
    //let isUser = false;

    let linkSearchType = searchType;
    let linkId = id;

    //each search type returns different information
    if (searchType === 'artist') {
        isArtist = true;
        image = props.images[0];
        genre = props.genres[0];
        popularity = props.popularity;
    }

    if (searchType === 'album') {
        isAlbum = true;
        image = props.images[0];
        artist = props.artists[0];
        releaseDate = props.release_date.substring(0, 4);  //show year only
    }

    if (searchType === 'track') {
        isTrack = true;
        image = props.album.images[0];
        artist = props.artists[0];
        popularity = props.popularity;
        linkSearchType = 'album';
        linkId = props.album.id;
    }

    // const getUserData = (id) => {
    //     if (isAuthenticated && !isLoading) {
    //         const userRef = ref(database, 'user/' + id);

    //         let userData = [];

    //         onValue(userRef, (snapshot) => {
    //             snapshot.forEach((childSnapshot) => {
    //                 userData = [...userData, childSnapshot.key];
    //                 console.log(userData[0])
    //             })
    //         });
    //     }

    //     name = names[0];
    // }

    // if (searchType === 'user') {
    //     isUser = true;
    //     image = profilePicture;
    //     linkId = 'abc'

    //     getUserData(props.userId);
    // }

    if (name && name.length > 30) {
        name = name.substring(0, 29) + '...';
    }

    return <>
        <div className="card mt-3 search-result">
            <Link to={`/${linkSearchType}/${linkId}`} className="search-result-link">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        {/* !isUser && <img className={`search-result-picture-${searchType} my-3`} src={image ? image.url : defaultAlbumCover} alt={searchType} /> */}
                        {/* isUser && <img className="search-result-picture-user my-3" src={image} alt={searchType} /> */}
                        <img className={`search-result-picture-${searchType} my-3`} src={image ? image.url : defaultAlbumCover} alt={searchType} />
                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <h5 className="card-title search-result-name mb-3">{name ? name : 'test'}</h5>
                    </div>
                </div>
            </Link>

            {isArtist &&
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Genre: {genre || '. . .'}</li>

                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-10">
                                <span>Popularity: </span>
                                <Stars popularity={popularity} />
                            </div>
                            <div className="col-2 d-flex justify-content-end">
                                {isAuthenticated && <button onClick={() => addArtistToProfile(id, isAuthenticated, isLoading, loggedInUser, database)} type="button" className="btn buttons btn-sm search-result-button d-none d-xl-block">+</button>}
                            </div>
                        </div>
                    </li>
                </ul>
            }

            {isAlbum &&
                <ul className="list-group list-group-flush">
                    <Link to={`/artist/${artist.id}`} className="list-group-item artist-name-link">{artist.name}</Link>

                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-10">
                                Release Date: {releaseDate}
                            </div>
                            <div className="col-2 d-flex justify-content-end">
                                {isAuthenticated && <button onClick={() => addAlbumToProfile(id, isAuthenticated, isLoading, loggedInUser, database)} type="button" className="btn buttons btn-sm search-result-button d-none d-xl-block">+</button>}
                            </div>
                        </div>
                    </li>
                </ul>
            }

            {isTrack &&
                <ul className="list-group list-group-flush">
                    <Link to={`/artist/${artist.id}`} className="list-group-item artist-name-link">{artist.name}</Link>

                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-10">
                                <span>Popularity: </span>
                                <Stars popularity={popularity} />
                            </div>
                            <div className="col-2 d-flex justify-content-end">
                                {isAuthenticated && <button onClick={() => addTrackToProfile(id, isAuthenticated, isLoading, loggedInUser, database)} type="button" className="btn buttons btn-sm search-result-button d-none d-xl-block">+</button>}
                            </div>
                        </div>
                    </li>
                </ul>
            }

        </div>
    </>
}

export default SearchResult;

