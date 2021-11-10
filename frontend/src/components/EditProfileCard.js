/* card component to edit user information */

import React, { useState } from 'react';
import profilePicture from '../assets/profile-picture.png';
import axios from 'axios';

const EditProfileCard = () => {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    const updateName = async () => {
        await axios.patch('/api/users/1', {
            username: name
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name) {
            updateName();
        }
        if (bio) {
            setBio(bio);
        }
    }

    return <>
        <div className="container mt-5">
            <div className="card profile-card d-flex justify-content-center" style={{ width: '75%' }}>
                <img src={profilePicture} className="card-img-top profile-picture mt-2" alt="Mary" />
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="col-auto mb-3">
                            <input type="text" id="name" name="name" className="form-control" aria-describedby="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="col-auto mb-3">
                            <input type="text" id="bio" name="bio" className="form-control" aria-describedby="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                        </div>
                        <button type="submit" className="btn buttons">Save</button>
                    </form>
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

export default EditProfileCard;