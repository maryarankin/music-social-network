/* card component that displays user information */

import React, { useEffect, useState, useRef } from 'react';
import profilePicture from '../assets/profile-picture.png'

const ProfileCard = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch('/api/users').then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonResponse => {
            setUser(jsonResponse[0]);
        })
    })

    return <>
        <div className="container mt-5">
            <div className="card profile-card d-flex justify-content-center" style={{ width: '75%' }}>
                <img src={profilePicture} className="card-img-top profile-picture mt-2" alt="Mary" />
                <div className="card-body">
                    <h5 className="card-title">{user.username}</h5>
                    <p className="card-text">Student at UF who likes to listen to music</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                </ul>
            </div>
        </div>
    </>
}

export default ProfileCard;