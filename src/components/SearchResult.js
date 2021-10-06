import React from 'react';
import { Link } from 'react-router-dom';
import defaultAlbumCover from '../assets/default-album-cover.png';

const SearchResult = (props) => {
    let name = props.name;
    let id = props.id;
    let searchType = props.searchType;

    let image = '';

    if (searchType == 'track') {
        image = props.album.images[0];
    }
    else {
        image = props.images[0];
    }

    return <>
        <Link to={`/${searchType}/${id}`} className="search-result-link">
            <div className="card mt-3 search-result">
                <img className={`search-result-picture-${searchType} my-3`} src={image ? image.url : defaultAlbumCover} />
                <h5 className="card-title search-result-name mb-3">{name}</h5>
            </div>
        </Link>
    </>
}

export default SearchResult;

