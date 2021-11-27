import React, { useState, useContext } from 'react';
import { fbStorage } from './firebase/firebase';
import { UserContext } from '../UserContext';

const UploadPic = () => {
    const { loggedInUser } = useContext(UserContext);
    const [image, setImage] = useState('');

    const upload = async () => {
        if (image == null)
            return;
        await fbStorage.ref(`/images/${loggedInUser.username}`).put(image);

        //refresh page automatically to show new profile pic once it's uploaded
        window.location.reload(true);
    }

    return (
        <div className="mb-4">
            <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
            <button onClick={upload} className="btn buttons">Upload</button>
        </div>
    );
}

export default UploadPic;