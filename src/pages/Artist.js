import React from 'react';
import ArtistCard from '../components/ArtistCard'
import { artistData } from '../data/artistData'

const Artist = () => {
    return <>
        <ArtistCard {...artistData} />
    </>
}

export default Artist;