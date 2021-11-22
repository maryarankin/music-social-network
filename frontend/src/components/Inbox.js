import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { query, ref, orderByChild, equalTo, onValue } from 'firebase/database';
import { FirebaseContext } from './firebase/FirebaseContext';
import { UserContext } from '../UserContext';

const Inbox = () => {
    const { loggedInUser } = useContext(UserContext);
    const { database } = useContext(FirebaseContext);
    const { isAuthenticated, isLoading } = useAuth0();
    const { id } = useParams();

    //get selected message
    const [mainMessage, setMainMessage] = useState();

    useEffect(() => {
        if (isAuthenticated && !isLoading && loggedInUser) {
            setMainMessage();
            const msgRef = ref(database, `messages/${id}`);

            onValue(msgRef, (snapshot) => {
                setMainMessage(snapshot.val());
            })
        }
    }, [isAuthenticated, isLoading, loggedInUser])

    //get all messages
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (isAuthenticated && !isLoading && loggedInUser) {
            setMessages([]);
            const msgRef = query(ref(database, 'messages'), orderByChild('toUser'), equalTo(loggedInUser.username));

            onValue(msgRef, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    setMessages(oldMessages => [...oldMessages, childSnapshot.val()]);
                })
            })
        }
    }, [isAuthenticated, isLoading, loggedInUser])

    return <div>
        <h1>main message: {mainMessage ? mainMessage.message : 'undefined'}</h1>
        {messages.map((msg, index) => {
            return <h1 key={index}>{msg.message}</h1>
        })}
    </div>
}

export default Inbox;