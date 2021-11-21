import React from 'react';
import profilePicture from '../assets/profile-picture.png';

const Friend = ({ friend }) => {
    return <div className="card">
        <img src={profilePicture} className="card-img-top" alt={`${friend}'s profile picture`} />
        <div className="card-body">
            <h5 className="card-title">{friend}</h5>
        </div>
    </div>
}

export default Friend;