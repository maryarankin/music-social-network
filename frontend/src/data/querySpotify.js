const axios = require('axios');

export const querySpotify = async (accessToken, searchType, searchQuery) => {
    let options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchType}&market=US&limit=10`,
        headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken }
    };

    let response = await axios.request(options);
    console.log(response.data);
    return response.data;
}