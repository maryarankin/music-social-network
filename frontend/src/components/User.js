import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from './firebase/FirebaseContext';
import { UserContext } from '../UserContext';
import { useAuth0 } from "@auth0/auth0-react";
import { query, ref, onValue, orderByChild, equalTo, set } from 'firebase/database';
import profilePicture from '../assets/anon-profile-picture.png';

const User = ({ friend }) => {
    const { isAuthenticated, isLoading } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    const { database } = useContext(FirebaseContext);

    //check if already friends
    const [friends, setFriends] = useState(false);

    useEffect(() => {
        if (isAuthenticated && !isLoading && loggedInUser) {
            setFriends(false);

            const toRef = query(ref(database, 'friends'), orderByChild('toUser'), equalTo(loggedInUser.username));

            onValue(toRef, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    if (friend && childSnapshot.val().fromUser === friend && childSnapshot.val().status === 'accepted') {
                        setFriends(true);
                    }
                })
            })

            const fromRef = query(ref(database, 'friends'), orderByChild('fromUser'), equalTo(loggedInUser.username));

            onValue(fromRef, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    if (friend && childSnapshot.val().toUser === friend && childSnapshot.val().status === 'accepted') {
                        setFriends(true);
                    }
                })
            })
        }
    }, [isAuthenticated, !isLoading, loggedInUser, friend])

    //add friend
    const addFriend = async () => {
        if (isAuthenticated && !isLoading) {
            set(ref(database, `friends/${loggedInUser.username}${friend}`), {
                status: 'pending',
                fromUser: loggedInUser.username,
                toUser: friend
            });
        }
    }

    return <div className="card mx-5 user-card" style={{ width: '15rem' }}>
        <Link to={`/user/${friend}`}>
            <img src={profilePicture} className="card-img-top" alt={friend} />
        </Link>
        <div className="card-body d-flex row">
            <div className="col-8">
                <h5 className="card-title">{friend}</h5>
            </div>
            <div className="col-4">
                {friends &&
                    <button type="button" className="btn friend-button btn-sm mx-2" disabled>&#10004;</button>
                }
                {!friends &&
                    <button onClick={addFriend} className="btn buttons btn-sm search-result-button mx-4">+</button>
                }
            </div>
        </div>
    </div>
}

export default User;