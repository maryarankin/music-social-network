/* card component to display artist info on artist show page */

import React from 'react';
import { Link } from 'react-router-dom';

const ArtistCard = ({ artistName, artistImage, artistGenre, artistFollowers, artistPopularity, artistTopTracks, relatedArtists }) => {

    //abbreviate top track names if too long
    artistTopTracks.forEach(track => {
        if (track.name.length > 38) {
            track.name = track.name.substring(0, 37) + '...';
        }
    })

    return <>
        <div className="container mt-5 mx-5 d-flex justify-content-center">
            <div className="card artist-card d-flex justify-content-center" style={{ width: '75%' }}>
                <img src={artistImage} className="card-img-top profile-picture mt-2" alt={artistName} />
                <div className="card-body">
                    <h5 className="card-title">{artistName}</h5>
                    <p className="card-text">Genre: {artistGenre}</p>
                    <p className="card-text">Followers: {artistFollowers}</p>
                    <p className="card-text">Popularity:</p>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped bg-dark" role="progressbar" style={{ width: `${artistPopularity}%` }} aria-valuenow={artistPopularity} aria-valuemin="0" aria-valuemax="100">{artistPopularity}%</div>
                    </div>
                </div>
                <div className="card-body">
                    <Link to="/" type="button" className="btn buttons mx-3">Add Artist</Link>
                </div>

                <div className="card-header artist-card-list-header mt-3">
                    Top Songs
                </div>
                <ul className="list-group list-group-flush">
                    {artistTopTracks.map((track) => {
                        return <li key={track.id} className="list-group-item artist-card-list">
                            <div className="row">
                                <div className="col-10">
                                    <Link to={`/album/${track.album.id}`} className="artist-card-link">{track.name}</Link>
                                </div>
                                <div className="col-2 d-flex justify-content-end">
                                    <Link to="" className="btn buttons btn-sm d-none d-xl-block">+</Link>
                                </div>
                            </div>
                        </li>
                    })}
                </ul>

                <div className="card-header artist-card-list-header">
                    Related Artists
                </div>
                <ul className="list-group list-group-flush">
                    {relatedArtists.map((artist) => {
                        return <li key={artist.id} className="list-group-item artist-card-list">
                            <div className="row">
                                <div className="col-10">
                                    <Link to={`/artist/${artist.id}`} className="artist-card-link">{artist.name}</Link>
                                </div>
                                <div className="col-2 d-flex justify-content-end">
                                    <Link to="" className="btn buttons btn-sm d-none d-xl-block">+</Link>
                                </div>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    </>

}

export default ArtistCard;