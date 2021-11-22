import React from 'react';
import { Link } from 'react-router-dom';

const Message = ({ message }) => {
    return <div className="card">
        <div className="card-header">
            <strong>Message</strong>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>From:</strong> {message && <Link to={`/user/${message.fromUser}`} className="msg-link">{message.fromUser}</Link>}</li>
            <li className="list-group-item">{message && message.message}</li>
        </ul>
    </div >
}

export default Message;