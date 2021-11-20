import React from 'react';
import { useParams } from 'react-router-dom';

const ShowUser = () => {
    const { id } = useParams();

    return <h1>user id: {id}</h1>
}

export default ShowUser;