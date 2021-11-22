/* card component to edit user information */

import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { update, ref } from 'firebase/database';
import { FirebaseContext } from './firebase/FirebaseContext';
import { IdContext } from '../IdContext';
import profilePicture from '../assets/anon-profile-picture.png';

const EditProfileCard = () => {
    const { userId } = useContext(IdContext);
    const { database } = useContext(FirebaseContext);

    const history = useHistory();
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     await axios.patch('/api/users/edit', {
    //         name: name,
    //         bio: bio
    //     });
    //     history.push("/profile");
    //     setName('');
    //     setBio('');
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        update(ref(database, 'user/' + userId), {
            name: name,
            bio: bio
        })

        history.push("/profile");
        setName('');
        setBio('');
    }

    return <>
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card profile-card d-flex justify-content-center" style={{ width: '45%' }}>
                <img src={profilePicture} className="card-img-top profile-picture mt-2" alt="Mary" />
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="col-auto mb-3">
                            <input type="text" id="name" name="name" className="form-control" aria-describedby="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="col-auto mb-3">
                            <input type="text" id="bio" name="bio" className="form-control" aria-describedby="bio" placeholder="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                        </div>

                        <button type="submit" className="btn buttons">Save</button>
                        <Link to="/profile" className="btn buttons mx-4">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default EditProfileCard;