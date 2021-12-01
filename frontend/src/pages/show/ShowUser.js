import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { query, ref, onValue, orderByChild, equalTo, set, remove } from 'firebase/database';
import { FirebaseContext } from '../../components/firebase/FirebaseContext';
import { UserContext } from '../../UserContext';
import ProfileCard from '../../components/ProfileCard';
import FaveArtist from '../../components/FaveArtist';
import FaveTrack from '../../components/FaveTrack';
import FaveAlbum from '../../components/FaveAlbum';

const ShowUser = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const { loggedInUser } = useContext(UserContext);
    const { database } = useContext(FirebaseContext);
    const { id } = useParams();

    const [otherUser, setOtherUser] = useState();
    const [otherUserId, setOtherUserId] = useState('');
    const [friends, setFriends] = useState(false);
    const [pending, setPending] = useState(false);
    const [removedFriend, setRemovedFriend] = useState(false);

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            const userRef = query(ref(database, 'user'), orderByChild('username'), equalTo(id));

            onValue(userRef, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    setOtherUserId(childSnapshot.key);
                    setOtherUser(childSnapshot.val());
                })
            })
        }
    }, [database, isAuthenticated, isLoading, id])

    const [favoriteAlbums, setFavoriteAlbums] = useState([]);
    const [favoriteTracks, setFavoriteTracks] = useState([]);
    const [favoriteArtists, setFavoriteArtists] = useState([]);

    //favorite artists
    useEffect(() => {
        if (isAuthenticated && !isLoading && otherUser) {
            const artistRef = query(ref(database, 'faveArtist'), orderByChild('user'), equalTo(otherUser.email));

            onValue(artistRef, (snapshot) => {
                setFavoriteArtists([]);
                snapshot.forEach((childSnapshot) => {
                    setFavoriteArtists(favoriteArtists => [...favoriteArtists, childSnapshot.val()]);
                })
            })
        }
    }, [database, isAuthenticated, isLoading, otherUser])

    //favorite tracks
    useEffect(() => {
        if (isAuthenticated && !isLoading && otherUser) {
            const trackRef = query(ref(database, 'faveTrack'), orderByChild('user'), equalTo(otherUser.email));

            onValue(trackRef, (snapshot) => {
                setFavoriteTracks([]);
                snapshot.forEach((childSnapshot) => {
                    setFavoriteTracks(favoriteTracks => [...favoriteTracks, childSnapshot.val()]);
                })
            })
        }
    }, [database, isAuthenticated, isLoading, otherUser])

    //favorite albums
    useEffect(() => {
        if (isAuthenticated && !isLoading && otherUser) {
            const albumRef = query(ref(database, 'faveAlbum'), orderByChild('user'), equalTo(otherUser.email));

            onValue(albumRef, (snapshot) => {
                setFavoriteAlbums([]);
                snapshot.forEach((childSnapshot) => {
                    setFavoriteAlbums(favoriteAlbums => [...favoriteAlbums, childSnapshot.val()]);
                })
            })
        }
    }, [database, isAuthenticated, isLoading, otherUser])

    //add friend
    const addFriend = async () => {
        if (isAuthenticated && !isLoading) {
            set(ref(database, `friends/${loggedInUser.username}${otherUser.username}`), {
                status: 'pending',
                fromUser: loggedInUser.username,
                toUser: otherUser.username
            });
        }
    }

    //remove friend
    const removeFriend = async () => {
        if (isAuthenticated && !isLoading) {
            setRemovedFriend(false);

            const toRef = query(ref(database, `friends/${loggedInUser.username}${otherUser.username}`));
            const fromRef = query(ref(database, `friends/${otherUser.username}${loggedInUser.username}`));

            remove(toRef);
            remove(fromRef);

            setRemovedFriend(true);
        }
    }

    //check if already friends
    useEffect(() => {
        if (isAuthenticated && !isLoading && loggedInUser) {
            setFriends(false);
            setPending(false);

            const toRef = query(ref(database, 'friends'), orderByChild('toUser'), equalTo(loggedInUser.username));

            onValue(toRef, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    if (otherUser && childSnapshot.val().fromUser === otherUser.username && childSnapshot.val().status === 'accepted') {
                        setFriends(true);
                    }
                    else if (otherUser && childSnapshot.val().fromUser === otherUser.username && childSnapshot.val().status === 'pending') {
                        setPending(true);
                    }
                })
            })

            const fromRef = query(ref(database, 'friends'), orderByChild('fromUser'), equalTo(loggedInUser.username));

            onValue(fromRef, (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    if (otherUser && childSnapshot.val().toUser === otherUser.username && childSnapshot.val().status === 'accepted') {
                        setFriends(true);
                    }
                    else if (otherUser && childSnapshot.val().toUser === otherUser.username && childSnapshot.val().status === 'pending') {
                        setPending(true);
                    }
                })
            })
        }
    }, [database, isAuthenticated, isLoading, loggedInUser, otherUser, removedFriend])

    return (
        <>
            <div>
                {!isAuthenticated && !isLoading && <h2 className="mt-5 mx-5">Please sign in to continue.</h2>}

                {isAuthenticated && <div className="row mb-5">
                    <div className="col-9 d-flex justify-content-center">

                        <div className="grid">
                            <div className="row mt-5">
                                <h1 className="favorite-title mb-4">favorite artists</h1>
                                {favoriteArtists.map((faveArtist) => {
                                    return <div className="col-3">
                                        <FaveArtist key={faveArtist.artistId} id={faveArtist.artistId} editMode={false} />
                                    </div>
                                })}
                            </div>

                            <div className="row mt-5">
                                <h1 className="favorite-title mb-4">favorite tracks</h1>
                                {favoriteTracks.map((faveTrack) => {
                                    return <div className="col-3">
                                        <FaveTrack key={faveTrack.trackId} id={faveTrack.trackId} editMode={false} />
                                    </div>
                                })}
                            </div>

                            <div className="row mt-5">
                                <h1 className="favorite-title mb-4">favorite albums</h1>
                                {favoriteAlbums.map((faveAlbum) => {
                                    return <div className="col-3">
                                        <FaveAlbum key={faveAlbum.albumId} id={faveAlbum.albumId} editMode={false} />
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        {!otherUser && <h1>loading</h1>}
                        {otherUser && <ProfileCard user={otherUser} />}

                        <div className="container">
                            <div className="card d-flex justify-content-center" style={{ width: '75%' }}>
                                <div className="card-body">
                                    {!friends && !pending && <button onClick={addFriend} type="button" className="btn buttons mx-1">Add Friend</button>}
                                    {friends && !pending && <button type="button" className="btn checkmark-button mx-1" disabled>Friends &#10004;</button>}
                                    {!friends && pending && <button type="button" className="btn checkmark-button mx-1" disabled>Request Pending</button>}
                                    <Link to={otherUser ? `/message/${otherUser.username}` : ''} className="btn buttons mx-1">Send Message</Link>
                                    {friends && !pending && <button onClick={removeFriend} type="button" className="btn buttons mx-1">Remove Friend</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        </>
    )
}

export default ShowUser;