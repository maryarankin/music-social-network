import React, { useState, useContext } from 'react';
import { fbStorage } from './firebase/firebase';
import { UserContext } from '../UserContext';

const UploadPic = () => {
    const { loggedInUser } = useContext(UserContext);
    const [image, setImage] = useState('');

    const upload = () => {
        alert('hi')
        if (image == null)
            return;
        fbStorage.ref(`/images/${loggedInUser.username}`).put(image)
            .on("state_changed", alert("success"), alert);
    }
    return (
        <div className="App">
            <center>
                <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
                <button onClick={upload}>Upload</button>
            </center>
        </div>
    );
}

export default UploadPic;