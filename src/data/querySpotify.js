const axios = require('axios');

export const querySpotify = (accessToken, searchType, searchQuery) => {
    let options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/search?q=Muse&type=${searchType}&market=US&limit=10`,
        headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken }
    };

    axios.request(options).then(function (response) {
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });
}