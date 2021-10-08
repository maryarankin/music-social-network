import React from 'react';
import { Link } from 'react-router-dom';
import profilePicture from '../assets/profile-picture.png'

const ProfileCard = () => {
    return <>
        <div className="container mt-5">
            <div className="card profile-card d-flex justify-content-center" style={{ width: '18rem' }}>
                <img src={profilePicture} className="card-img-top profile-picture mt-2" alt="Mary" />
                <div className="card-body">
                    <h5 className="card-title">Mary Rankin</h5>
                    <p className="card-text">Student at UF who likes to listen to music</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                </ul>
                <div className="card-body">
                    <Link to="/" type="button" className="btn buttons mx-3">Edit Profile</Link>
                </div>
            </div>
        </div>
    </>
}

export default ProfileCard;