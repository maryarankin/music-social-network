/* Profile page where all of a user's information is shown; also where they can display their favorite albums, songs, and artists */

import React, { useState } from 'react';
import Album from './Album';
import { albumData } from './albumData';

const Profile = () => {
    const [albums, setAlbums] = useState(albumData);

    return (
        <div>
            {
                albums.map((album) => {
                    return (
                        <Album key={album.albumId} {...album} />
                    )
                })
            }
        </div>
    )
}

export default Profile;