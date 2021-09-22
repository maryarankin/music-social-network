import React from 'react';
import ArtistCard from '../components/ArtistCard'
//import { artistData } from '../data/artistData'

const Artist = (props) => {
    let accessToken = props.accessToken;

    return <>
        <ArtistCard accessToken={accessToken} />
    </>
}

export default Artist;