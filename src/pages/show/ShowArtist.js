import React from 'react';
import ArtistCard from '../../components/ArtistCard'
//import { artistData } from '../data/artistData'

const ShowArtist = (props) => {
    let accessToken = props.accessToken;

    return <>
        <ArtistCard accessToken={accessToken} />
    </>
}

export default ShowArtist;