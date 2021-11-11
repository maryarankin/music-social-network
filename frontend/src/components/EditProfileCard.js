/* card component to edit user information */

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profilePicture from '../assets/profile-picture.png';
import axios from 'axios';

const EditProfileCard = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    //const [bio, setBio] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.patch('/api/users/edit', {
            username: name
        });
        history.push("/profile");
        setName("");
    }

    return <>
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card profile-card d-flex justify-content-center" style={{ width: '45%' }}>
                <img src={profilePicture} className="card-img-top profile-picture mt-2" alt="Mary" />
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="col-auto mb-3">
                            <input type="text" id="name" name="name" className="form-control" aria-describedby="name" value={name} onChange={(e) => setName(e.target.value)} />
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


/*

<div className="col-auto mb-3">
                            <input type="text" id="bio" name="bio" className="form-control" aria-describedby="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                        </div>

*/