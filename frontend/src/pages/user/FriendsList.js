import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../components/firebase/FirebaseContext';
import { UserContext } from '../../UserContext';
import { useAuth0 } from "@auth0/auth0-react";
import { query, ref, onValue, orderByChild, equalTo } from 'firebase/database';
import User from '../../components/User';

const FriendsList = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    const { database } = useContext(FirebaseContext);

    const [friends, setFriends] = useState([]);

    //get friends
    useEffect(() => {
        if (isAuthenticated && !isLoading && loggedInUser) {
            setFriends([]);

            const toFriendsRef = query(ref(database, 'friends'), orderByChild('toUser'), equalTo(loggedInUser.username));

            onValue(toFriendsRef, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    if (childSnapshot.val().status === 'accepted') {
                        setFriends(oldFriends => [...oldFriends, childSnapshot.val().fromUser]);
                    }
                })
            })

            const fromFriendsRef = query(ref(database, 'friends'), orderByChild('fromUser'), equalTo(loggedInUser.username));

            onValue(fromFriendsRef, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    if (childSnapshot.val().status === 'accepted') {
                        setFriends(oldFriends => [...oldFriends, childSnapshot.val().toUser]);
                    }
                })
            })
        }
    }, [database, isAuthenticated, isLoading, loggedInUser])

    return <div>
        {!isAuthenticated && <h1>Sign in to continue</h1>}

        {isAuthenticated &&
            <div className="d-flex justify-content-center">
                <div className="row mt-5">
                    {friends.map((friend, index) => {
                        return <div className="col-3 mx-5" key={index}>
                            <User friend={friend} />
                        </div>
                    })}
                </div>
            </div>
        }
    </div>
}

export default FriendsList;