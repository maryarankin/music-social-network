/* get access token from spotify */

import { credentials } from './credentials'
const axios = require('axios');
const qs = require('qs');

export const spotifyAuthorization = async () => {

    //const clientID = process.env.REACT_APP_CLIENT_ID
    //const clientSecret = process.env.REACT_APP_CLIENT_SECRET

    const headers = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
            username: credentials.clientId,
            password: credentials.clientSecret,
        },
    };
    const data = {
        grant_type: 'client_credentials',
    };

    try {
        const response = await axios.post(
            'https://accounts.spotify.com/api/token',
            qs.stringify(data),
            headers
        );
        return response.data.access_token;
    } catch (error) {
        console.log(error);
    }
}