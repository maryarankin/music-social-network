/* navbar on each page */

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from '../UserContext';
import { FirebaseContext } from './firebase/FirebaseContext';
import { query, ref, onValue, orderByChild, equalTo, update } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';

const Navbar = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    const { database } = useContext(FirebaseContext);
    const [hasNotif, setHasNotif] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const [clickedNotif, setClickedNotif] = useState(false);

    //check for notifications
    useEffect(() => {
        if (isAuthenticated && !isLoading && loggedInUser) {
            setHasNotif(false);

            const notifRef = query(ref(database, 'friends'), orderByChild('toUser'), equalTo(loggedInUser.username));

            onValue(notifRef, (snapshot) => {
                setNotifications([]);
                snapshot.forEach((childSnapshot) => {
                    if (childSnapshot.val().status == 'pending') {
                        setNotifications(oldNotifications => [...oldNotifications, childSnapshot.val()]);
                        setHasNotif(true);
                    }
                })
            })
        }
    }, [isAuthenticated, !isLoading, loggedInUser, clickedNotif])

    const acceptFriendRequest = (fromUser, toUser) => {
        setClickedNotif(true);

        update(ref(database, 'friends/' + `${fromUser}${toUser}`), {
            status: 'accepted'
        })

        setClickedNotif(false);
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

                        {isAuthenticated &&
                            <li className="nav-item">
                                <Link to="/findfriends" className="nav-link">Connect</Link>
                            </li>
                        }

                        {isAuthenticated &&
                            <li className="nav-item">
                                <Link to="/friends" className="nav-link">My Friends</Link>
                            </li>
                        }
                    </ul>
                </div>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    {isAuthenticated && notifications[0] &&
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon className="notif-icon-solid" icon={faBell} />
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {!notifications[0] &&
                                    <li>
                                        <p className="dropdown-item">No Notifications</p>
                                    </li>
                                }

                                {notifications[0] && notifications.map((notif, index) => {
                                    if (index > 0) {
                                        return <div key={index}>
                                            <li><hr className="dropdown-divider" /></li>
                                            <button onClick={() => acceptFriendRequest(notif.fromUser, loggedInUser.username)} className="dropdown-item">Friend request from {notif.fromUser}</button>
                                        </div>
                                    }
                                    else {
                                        return <button onClick={() => acceptFriendRequest(notif.fromUser, loggedInUser.username)} key={index} className="dropdown-item">Friend request from {notif.fromUser}</button>
                                    }
                                })}
                            </ul>
                        </li>
                    }

                    {isAuthenticated && !notifications[0] &&
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