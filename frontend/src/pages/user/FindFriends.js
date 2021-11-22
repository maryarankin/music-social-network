import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../components/firebase/FirebaseContext';
import { UserContext } from '../../UserContext';
import { useAuth0 } from "@auth0/auth0-react";
import { query, ref, onValue } from 'firebase/database';
import User from '../../components/User';

const FindFriends = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    const { database } = useContext(FirebaseContext);

    const [dbLoading, setDbLoading] = useState(true);

    const [allUsers, setAllUsers] = useState([]);

    const searchUsers = () => {
        if (isAuthenticated && !isLoading) {
            setAllUsers([]);

            const userRef = query(ref(database, 'user'));

            onValue(userRef, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    if (childSnapshot.val().username !== loggedInUser.username) {
                        setAllUsers((oldValues) => [...oldValues, childSnapshot.val()]);
                    }
                })
            })

            console.log(allUsers);
            setDbLoading(false);
        }
    }

    useEffect(() => {
        searchUsers();
    }, [])


    return <div>
        {!isAuthenticated && <h1>Sign in to continue</h1>}

        {isAuthenticated && dbLoading && <h1>loading</h1>}

        {isAuthenticated &&
            <div className="d-flex justify-content-center">
                <div className="row mt-5">
                    {allUsers.map((user, index) => {
                        return <div className="col-3 mx-5" key={index}>
                            <User friend={user.username} />
                        </div>
                    })}
                </div>
            </div>
        }
    </div>
}

export default FindFriends;

