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
            <div className="card mt-3 search-result-card">
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <img className="search-result-picture" src={image ? image.url : defaultAlbumCover} />
                        </div>
                        <div className="col">
                            <p className="search-result-name">{name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    </>
}

export default SearchResult;
