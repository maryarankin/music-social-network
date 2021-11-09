import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';
import defaultAlbumCoverDark from '../assets/default-album-cover-dark.png';
const axios = require('axios');

const FaveTrack = ({ id, editMode }) => {
    const { accessToken } = useContext(Context);

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [albumId, setAlbumId] = useState('');

    const getTrack = (accessToken, id) => {
        let options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/tracks/${id}`,
            headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken }
        };

        axios.request(options).then(function (response) {
            setName(response.data.name);
            setImage(response.data.album.images[0].url);
            setAlbumId(response.data.album.id);
        }).catch(function (error) {
            console.error(error);
        });
    }

    useEffect(() => {
        getTrack(accessToken, id);
    }, [id])



    //abbreviate name if too long
    // if (name.length > 21) {
    //     name = name.substring(0, 20) + '...';
    // }

    const removeTrack = async () => {
        await axios.delete(`/api/faves/tracks/${id}`);
    }

    return (
        <div className="card">
            <Link to={`/album/${albumId}`} className="favorite-link">
                <img src={image || defaultAlbumCoverDark} className="card-img-top" alt={name} />
            </Link>
            <div className="card-body d-flex justify-content-center">
                <h5 className="card-title favorite-name">{name}</h5>
                {editMode && <button onClick={removeTrack} type="button" class="btn-close remove-button" aria-label="Close"></button>}
            </div>
        </div>
    )
}

export default FaveTrack;