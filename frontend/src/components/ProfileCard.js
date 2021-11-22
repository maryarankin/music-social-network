/* card component that displays user information */

import React, { useState, useEffect, useContext } from 'react';
import { fbStorage } from '../components/firebase/firebase';
import { useAuth0 } from "@auth0/auth0-react";
import { FirebaseContext } from '../components/firebase/FirebaseContext';
import { UserContext } from '../UserContext';
import profilePicture from '../assets/anon-profile-picture.png';

const ProfileCard = ({ user }) => {
    const { isAuthenticated, isLoading } = useAuth0();
    const { database } = useContext(FirebaseContext);
    const { loggedInUser } = useContext(UserContext);
    const [profilePic, setProfilePic] = useState('');

    //get profile picture
    useEffect(() => {
        if (isAuthenticated && !isLoading && loggedInUser) {
            const picRef = fbStorage.ref('images/' + loggedInUser.username);

            picRef.getDownloadURL().then((url) => {
                setProfilePic(url);
            })
        }
    }, [isAuthenticated, isLoading, loggedInUser])

    return <>
        <div className="container mt-5">
            <div className="card profile-card d-flex justify-content-center" style={{ width: '75%' }}>
                <img src={profilePic ? profilePic : profilePicture} className="card-img-top profile-picture mt-2" alt="Mary" />
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.bio || 'Welcome to my page!'}</p>
                </div>
            </div>
        </div>
    </>
}

export default ProfileCard;