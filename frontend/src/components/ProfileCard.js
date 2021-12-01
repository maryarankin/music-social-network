/* card component that displays user information */

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fbStorage } from '../components/firebase/firebase';
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from '../UserContext';
import defaultProfilePicture from '../assets/anon-profile-picture.png';

const ProfileCard = ({ user }) => {
    const { isAuthenticated, isLoading } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    const [profilePic, setProfilePic] = useState('');

    //get profile picture
    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            const picRef = fbStorage.ref('images/' + user.username);

            picRef.getDownloadURL().then((url) => {
                setProfilePic(url);
            })
        }
    }, [isAuthenticated, isLoading])

    return <>
        <div className="container mt-5">
            <div className="card profile-card d-flex justify-content-center" style={{ width: '75%' }}>
                <img src={profilePic ? profilePic : defaultProfilePicture} className="card-img-top profile-picture mt-2" alt={`user.username`} />
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.bio || 'Welcome to my page!'}</p>
                    {loggedInUser && loggedInUser.username === user.username && <Link to="/profile/edit" className="btn buttons">Edit Profile</Link>}
                </div>
            </div>
        </div>
    </>
}

export default ProfileCard;