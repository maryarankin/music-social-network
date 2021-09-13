/* Profile page where all of a user's information is shown; also where they can display their favorite albums, songs, and artists */

import React, { useState } from 'react';
import Album from '../components/Album';
import { albumData } from '../data/albumData';

const Profile = () => {
    const [albums, setAlbums] = useState(albumData);

    return (
        <div className="container">
            <div className="row mt-5">
                {
                    albums.map((album) => {
                        return (
                            <div className="col-4 mb-5" key={album.albumId}>
                                <Album {...album} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile;