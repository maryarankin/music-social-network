/* navbar on each page */

import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from '../UserContext';
import { FirebaseContext } from './firebase/FirebaseContext';
import { query, ref, onValue, orderByChild, equalTo, update, remove } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';

const Navbar = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    const { database } = useContext(FirebaseContext);
    const history = useHistory();
    const [friendNotifs, setFriendNotifs] = useState([]);
    const [msgNotifs, setMsgNotifs] = useState([]);
    const [msgIds, setMsgIds] = useState([]);

    const [clickedNotif, setClickedNotif] = useState(false);

    //check for notifications
    useEffect(() => {
        if (isAuthenticated && !isLoading && loggedInUser) {
            setFriendNotifs([]);
            setMsgNotifs([]);
            setMsgIds([]);

            const notifRef = query(ref(database, 'friends'), orderByChild('toUser'), equalTo(loggedInUser.username));

            onValue(notifRef, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    if (childSnapshot.val().status === 'pending') {
                        setFriendNotifs(oldNotifications => [...oldNotifications, childSnapshot.val()]);
                    }
                })
            })

            const msgRef = query(ref(database, 'messages'), orderByChild('toUser'), equalTo(loggedInUser.username));

            onValue(msgRef, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    if (childSnapshot.val().status === 'unread') {
                        setMsgNotifs(oldNotifications => [...oldNotifications, childSnapshot.val()]);
                        setMsgIds(oldIds => [...oldIds, childSnapshot.key]);
                    }
                })
            })
        }
    }, [isAuthenticated, !isLoading, loggedInUser, clickedNotif])

    const acceptFriendRequest = (fromUser, toUser) => {
        setClickedNotif(!clickedNotif);

        update(ref(database, 'friends/' + `${fromUser}${toUser}`), {
            status: 'accepted'
        })

        //refresh page automatically to show friend status
        window.location.reload(true);
    }

    const rejectFriendRequest = (fromUser, toUser) => {
        setClickedNotif(!clickedNotif);

        remove(ref(database, 'friends/' + `${fromUser}${toUser}`));

        //refresh page automatically to show friend status
        window.location.reload(true);
    }

    const viewMessage = (id) => {
        setClickedNotif(!clickedNotif);

        update(ref(database, 'messages/' + `${id}`), {
            status: 'read'
        })

        history.push(`/inbox/${id}`);
    }

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">music mates</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item d-lg-none">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item d-lg-none">
                            <Link to="/register" className="nav-link">Register</Link>
                        </li>

                        {isAuthenticated &&
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link">Profile</Link>
                            </li>
                        }

                        {isAuthenticated &&
                            <li className="nav-item">
                                <Link to="/friends" className="nav-link">My Friends</Link>
                            </li>
                        }

                        {isAuthenticated &&
                            <li className="nav-item">
                                <Link to="/inbox" className="nav-link">Inbox</Link>
                            </li>
                        }

                        {isAuthenticated &&
                            <li className="nav-item">
                                <Link to="/findfriends" className="nav-link">Connect</Link>
                            </li>
                        }

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Search
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <Link to="/artistsearch" className="dropdown-item">By Artist</Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link to="/albumsearch" className="dropdown-item">By Album</Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link to="/tracksearch" className="dropdown-item">By Track</Link>
                                </li>

                                {/* <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link to="/usersearch" className="dropdown-item">By User</Link>
                                </li> */}
                            </ul>
                        </li>
                    </ul>
                </div>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    {isAuthenticated && (friendNotifs[0] || msgNotifs[0]) &&
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon className="notif-icon-solid" icon={faBell} />
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {!friendNotifs[0] && !msgNotifs[0] &&
                                    <li>
                                        <p className="dropdown-item">No Notifications</p>
                                    </li>
                                }

                                {(friendNotifs[0]) && friendNotifs.map((notif, index) => {
                                    if (index > 0) {
                                        return <div key={index}>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li className="dropdown-item">
                                                Friend request from {notif.fromUser}
                                                <button onClick={() => acceptFriendRequest(notif.fromUser, loggedInUser.username)} className="dropdown-item">Accept</button>
                                                <button onClick={() => rejectFriendRequest(notif.fromUser, loggedInUser.username)} className="dropdown-item">Reject</button>
                                            </li>
                                        </div>
                                    }
                                    else {
                                        return <li className="dropdown-item" key={index}>
                                            Friend request from {notif.fromUser}
                                            <button onClick={() => acceptFriendRequest(notif.fromUser, loggedInUser.username)} className="dropdown-item">Accept</button>
                                            <button onClick={() => rejectFriendRequest(notif.fromUser, loggedInUser.username)} className="dropdown-item">Reject</button>
                                        </li>
                                    }
                                })}

                                {(msgNotifs[0]) && msgNotifs.map((notif, index) => {
                                    if (index > 0 || friendNotifs[0]) {
                                        return <div key={index}>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li className="dropdown-item">
                                                <button onClick={() => viewMessage(msgIds[index])} className="dropdown-item">Message from {notif.fromUser}</button>
                                            </li>
                                        </div>
                                    }
                                    else {
                                        return <li className="dropdown-item" key={index}>
                                            <button onClick={() => viewMessage(msgIds[index])} className="dropdown-item">Message from {notif.fromUser}</button>
                                        </li>
                                    }
                                })}
                            </ul>
                        </li>
                    }

                    {isAuthenticated && !friendNotifs[0] && !msgNotifs[0] &&
                        <li className="nav-item mx-3">
                            <FontAwesomeIcon className="notif-icon" icon={farBell} />
                        </li>
                    }

                    {isAuthenticated && <div>
                        <span className="mx-4">Welcome, {loggedInUser ? loggedInUser.username : 'loading'}</span>
                        <LogoutButton />
                    </div>}

                    {!isAuthenticated && <LoginButton />}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;