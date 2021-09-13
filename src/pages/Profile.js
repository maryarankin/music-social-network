/* Profile page where all of a user's information is shown; also where they can display their favorite albums, songs, and artists */

import React, { useState } from 'react';
import Album from '../components/Album';
import { albumData } from '../data/albumData';
import ProfileCard from '../components/ProfileCard';

const Profile = () => {
    const [albums, setAlbums] = useState(albumData);

    return (
        <>
            <div>
                <div className="row">

                    <div className="col-9 d-flex justify-content-center">

                        <div className="taste-board">
                            <div className="row mt-5 mx-4">
                                {
                                    albums.map((album) => {
                                        return (
                                            <div className="col-3 mb-5" key={album.albumId}>
                                                <Album {...album} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>


                    <div className="col">
                        <ProfileCard />
                    </div>

                </div>
            </div>



        </>
    )
}

export default Profile;