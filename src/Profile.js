/* Profile page where all of a user's information is shown; also where they can display their favorite albums, songs, and artists */

import React, { useState } from 'react';
import Album from './Album';
import { albumData } from './albumData';

const Profile = () => {
    const [albums, setAlbums] = useState(albumData);

    return (
        <div class="container">
            <div class="row mt-5">
                {
                    albums.map((album) => {
                        return (
                            <div class="col-4 mb-5">
                                <Album key={album.albumId} {...album} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile;