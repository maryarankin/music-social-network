import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../components/firebase/FirebaseContext';
import { UserContext } from '../../UserContext';
import { useAuth0 } from "@auth0/auth0-react";
import { query, ref, onValue } from 'firebase/database';

const FindFriends = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    const { database } = useContext(FirebaseContext);

    const [dbLoading, setDbLoading] = useState(true);

    const [allUsers, setAllUsers] = useState([]);
    //const [allIds, setAllIds] = useState([]);

    const searchUsers = () => {
        if (isAuthenticated && !isLoading) {
            const userRef = query(ref(database, 'user'));

            onValue(userRef, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    setAllUsers((oldValues) => [...oldValues, childSnapshot.val()]);
                    //setAllIds((oldValues) => [...oldValues, childSnapshot.key]);
                })
            })

            console.log(allUsers);
            setDbLoading(false);
        }
    }

    //IF ABOVE FXN DOESN'T WORK, USE FXNS FROM PROFILE PAGE
    //ON THE USER'S PAGE, DO ANOTHER QUERY OF DATABASE BASED ON USERNAME TO GET OTHER INFO LIKE FAVES, NAME, & BIO

    useEffect(() => {
        searchUsers();
    }, [])


    return <div>
        {dbLoading && <h1>loading</h1>}

        {allUsers.map((user) => {
            return <div>
                <h1>{user.name}</h1>
                <Link to={`/user/${user.username}`}>View Profile</Link>
            </div>

        })}
    </div>
}

export default FindFriends;
