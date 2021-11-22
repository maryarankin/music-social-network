/* card component to send message to another user */

import React, { useState, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { set, ref } from 'firebase/database';
import { FirebaseContext } from './firebase/FirebaseContext';
import { UserContext } from '../UserContext';
import profilePicture from '../assets/anon-profile-picture.png';

const MessageForm = () => {
    const { loggedInUser } = useContext(UserContext);
    const { database } = useContext(FirebaseContext);
    const { isAuthenticated, isLoading } = useAuth0();
    const { id } = useParams();

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
                <img src={profilePicture} className="card-img-top profile-picture mt-2" alt="Mary" />
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="col-auto mb-3">
                            <input type="textarea" id="message" name="message" className="form-control" aria-describedby="message" placeholder="message" value={message} onChange={(e) => setMessage(e.target.value)} />
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