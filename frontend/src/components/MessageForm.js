/* card component to send message to another user */

import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { set, ref } from 'firebase/database';
import { fbStorage } from '../components/firebase/firebase';
import { FirebaseContext } from './firebase/FirebaseContext';
import { UserContext } from '../UserContext';
import defaultProfilePicture from '../assets/anon-profile-picture.png';

const MessageForm = () => {
    const { loggedInUser } = useContext(UserContext);
    const { database } = useContext(FirebaseContext);
    const { isAuthenticated, isLoading } = useAuth0();
    const { id } = useParams();

    const [profilePic, setProfilePic] = useState('');

    //get profile picture
    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            const picRef = fbStorage.ref('images/' + id);

            picRef.getDownloadURL().then((url) => {
                setProfilePic(url);
            })
        }
    }, [isAuthenticated, isLoading])

    const history = useHistory();
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isAuthenticated && !isLoading) {
            set(ref(database, `messages/${Date.now()}${loggedInUser.username}`), {
                message: message,
                status: 'unread',
                toUser: id,
                fromUser: loggedInUser.username
            })
        }

        history.push(`/user/${id}`);
        setMessage('');
    }

    return <>
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card profile-card d-flex justify-content-center" style={{ width: '45%' }}>
                <img src={profilePic ? profilePic : defaultProfilePicture} className="card-img-top profile-picture mt-2" alt={id} />
                <div className="card-body">
                    <h5 className="card-title mb-3">To: {id}</h5>

                    <form onSubmit={handleSubmit}>
                        <div className="col-auto mb-3">
                            <input type="textarea" id="message" name="message" className="form-control" aria-describedby="message" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
                        </div>
                        <button type="submit" className="btn buttons">Send</button>

                        <Link to={`/user/${id}`} className="btn buttons mx-4">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default MessageForm;