/* card component to edit user information */

import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { update, ref } from 'firebase/database';
import { fbStorage } from '../components/firebase/firebase';
import { FirebaseContext } from './firebase/FirebaseContext';
import { UserContext } from '../UserContext';
import { IdContext } from '../IdContext';
import { useAuth0 } from "@auth0/auth0-react";
import UploadPic from './UploadPic';
import defaultProfilePicture from '../assets/anon-profile-picture.png';

const EditProfileCard = () => {
    const { userId } = useContext(IdContext);
    const { database } = useContext(FirebaseContext);
    const { isAuthenticated, isLoading } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    const [profilePic, setProfilePic] = useState('');

    const history = useHistory();
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    //get current profile picture
    useEffect(() => {
        if (isAuthenticated && !isLoading && loggedInUser) {
            setName(loggedInUser.name);
            setBio(loggedInUser.bio);

            const picRef = fbStorage.ref('images/' + loggedInUser.username);

            picRef.getDownloadURL().then((url) => {
                setProfilePic(url);
            })
        }
    }, [isAuthenticated, isLoading, loggedInUser])

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
                <img src={profilePic ? profilePic : defaultProfilePicture} className="card-img-top profile-picture mt-2" alt="Mary" />
                <div className="card-body">
                    <h5 className="card-title my-3">Upload Profile Picture</h5>
                    <UploadPic />

                    <h5 className="card-title mb-3">Edit Profile Information</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="col-auto mb-2">
                            <label for="name">Name</label>
                            <input type="text" id="name" name="name" className="form-control" aria-describedby="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="col-auto mb-4">
                            <label for="bio">About Me</label>
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