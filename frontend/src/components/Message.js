import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { remove, ref } from 'firebase/database';
import { FirebaseContext } from './firebase/FirebaseContext';

const Message = ({ message, id }) => {
    const { database } = useContext(FirebaseContext);
    const { isAuthenticated, isLoading } = useAuth0();
    const history = useHistory();

    let timestamp = new Date(message.date);
    let timestampString = timestamp.toString();
    timestampString = timestampString.substr(0, timestampString.indexOf('GMT'));

    const deleteMessage = () => {
        if (isAuthenticated && !isLoading) {
            remove(ref(database, 'messages/' + `${id}`));

            history.push("/inbox");
        }
    }

    return <div className="card msg-txt">
        <div className="card-header">
            <strong>Message</strong>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item msg-txt"><strong>From:</strong> {message && <Link to={`/user/${message.fromUser}`} className="msg-link">{message.fromUser}</Link>}</li>
            <li className="list-group-item msg-txt"><strong>Sent:</strong> {message && timestampString}</li>
            <li className="list-group-item msg-txt">{message && message.message}</li>
            <li className="list-group-item">
                <Link to={`/message/${message.fromUser}`} className="btn buttons">Reply</Link>
                <button onClick={deleteMessage} className="btn buttons mx-3">Delete</button>
            </li>
        </ul>
    </div>
}

export default Message;