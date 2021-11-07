import React from 'react';
import { useEffect, useState } from 'react';

const UserTest = () => {
    const [initialState, setInitialState] = useState([]);

    useEffect(() => {
        fetch('/api/users').then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(jsonResponse => setInitialState(jsonResponse))
    }, [])

    console.log(initialState);

    return <div>hi, {initialState[0].username}</div>
}

export default UserTest;