/* card component that displays user information */

import React, { useEffect, useState } from 'react';
import profilePicture from '../assets/profile-picture.png';

const ProfileCard = ({ user }) => {

    return <>
        <div className="container mt-5">
            <div className="card profile-card d-flex justify-content-center" style={{ width: '75%' }}>
                <img src={profilePicture} className="card-img-top profile-picture mt-2" alt="Mary" />
                <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.bio || 'Welcome to my page!'}</p>
                </div>
            </div>
        </div>
    </>
}

export default ProfileCard;