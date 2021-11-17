import { ref, remove } from 'firebase/database';

export const removeTrack = async (idToRemove, isAuthenticated, isLoading, loggedInUser, database) => {
    if (isAuthenticated && !isLoading) {
        let dbId = loggedInUser.email.substr(0, loggedInUser.email.indexOf('.'));

        remove(ref(database, 'faveTrack/' + `${idToRemove}${dbId}`));
    }
}

export const removeArtist = async (idToRemove, isAuthenticated, isLoading, loggedInUser, database) => {
    if (isAuthenticated && !isLoading) {
        let dbId = loggedInUser.email.substr(0, loggedInUser.email.indexOf('.'));

        remove(ref(database, 'faveArtist/' + `${idToRemove}${dbId}`));
    }
}

export const removeAlbum = async (idToRemove, isAuthenticated, isLoading, loggedInUser, database) => {
    if (isAuthenticated && !isLoading) {
        let dbId = loggedInUser.email.substr(0, loggedInUser.email.indexOf('.'));

        remove(ref(database, 'faveAlbum/' + `${idToRemove}${dbId}`));
    }
}