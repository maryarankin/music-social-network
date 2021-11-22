import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { query, ref, orderByChild, equalTo, onValue } from 'firebase/database';
import { FirebaseContext } from './firebase/FirebaseContext';
import { UserContext } from '../UserContext';
import Message from './Message';

const Inbox = () => {
    const { loggedInUser } = useContext(UserContext);
    const { database } = useContext(FirebaseContext);
    const { isAuthenticated, isLoading } = useAuth0();
    const { id } = useParams();

    //get selected message & all other messages
    const [mainMessage, setMainMessage] = useState();
    const [messages, setMessages] = useState([]);
    const [msgIds, setMsgIds] = useState([]);

    useEffect(() => {
        setMainMessage();

        if (isAuthenticated && !isLoading && loggedInUser && id) {
            const msgRef = ref(database, `messages/${id}`);

            onValue(msgRef, (snapshot) => {
                setMainMessage(snapshot.val());
            })
        }
    }, [isAuthenticated, isLoading, loggedInUser, id])

    useEffect(() => {
        if (isAuthenticated && !isLoading && loggedInUser) {
            setMessages([]);
            const msgsRef = query(ref(database, 'messages'), orderByChild('toUser'), equalTo(loggedInUser.username));

            onValue(msgsRef, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    setMessages(oldMessages => [...oldMessages, childSnapshot.val()]);
                    setMsgIds(oldMsgIds => [...oldMsgIds, childSnapshot.key]);
                })
            })
        }
    }, [isAuthenticated, isLoading, loggedInUser, id])

    return <div className="container mt-5">
        {!mainMessage && id && <h1>loading</h1>}
        <div className="row">

            <div className="col-4">
                <div className="card" style={{ width: '75%' }}>
                    <div className="card-header">
                        <strong>All Messages</strong>
                    </div>
                    <ul className="list-group list-group-flush">
                        {messages.map((msg, index) => {
                            return <Link to={`/inbox/${msgIds[index]}`} key={index} className="msg-link">
                                {msg.status === 'unread' && msgIds[index] === id && <li className="list-group-item selected-message"><strong>From: {msg.fromUser}</strong></li>}
                                {msg.status === 'read' && msgIds[index] === id && <li className="list-group-item selected-message">From: {msg.fromUser}</li>}

                                {msg.status === 'unread' && msgIds[index] !== id && <li className="list-group-item"><strong>From: {msg.fromUser}</strong></li>}
                                {msg.status === 'read' && msgIds[index] !== id && <li className="list-group-item">From: {msg.fromUser}</li>}
                            </Link>
                        })}
                    </ul>
                </div>
            </div>

            <div className="col-8">
                {mainMessage &&
                    <Message message={mainMessage} />}
            </div>
        </div>
    </div>
}

export default Inbox;