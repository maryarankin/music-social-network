import { ref, set } from 'firebase/database';

export const addArtistToProfile = async (idToAdd, isAuthenticated, isLoading, loggedInUser, database) => {
    if (isAuthenticated && !isLoading) {
        let dbId = loggedInUser.email.substr(0, loggedInUser.email.indexOf('.'));
        set(ref(database, `faveArtist/${idToAdd}${dbId}`), {
            artistId: idToAdd,
            user: loggedInUser.email
        })
    }
}

export const addTrackToProfile = async (idToAdd, isAuthenticated, isLoading, loggedInUser, database) => {
    if (isAuthenticated && !isLoading) {
        let dbId = loggedInUser.email.substr(0, loggedInUser.email.indexOf('.'));
        set(ref(database, `faveTrack/${idToAdd}${dbId}`), {
            trackId: idToAdd,
            user: loggedInUser.email
        })
    }
}

export const addAlbumToProfile = async (idToAdd, isAuthenticated, isLoading, loggedInUser, database) => {
    if (isAuthenticated && !isLoading) {
        let dbId = loggedInUser.email.substr(0, loggedInUser.email.indexOf('.'));
        set(ref(database, `faveAlbum/${idToAdd}${dbId}`), {
            albumId: idToAdd,
            user: loggedInUser.email
        })
    }
}