const axios = require('axios');

export const querySpotify = async (accessToken, searchType, searchQuery) => {
    let options = {
        method: 'GET',
        url: `https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchType}&market=US&limit=10`,
        headers: { 'content-type': 'application/json', authorization: 'Bearer ' + accessToken }
    };

    // axios.request(options).then(function (response) {
    //     console.log(response.data);
    //     return response.data;
    // }).catch(function (error) {
    //     console.error(error);
    // });

    let response = await axios.request(options);
    console.log(response.data);
    return response.data;
}



// useEffect(() => {
//     const getUsers = async () => {
//         let response = await axios.get('/users');
//         if (response.status == 200) {
//             setUserdetails(response.data);
//             setError(false);
//             return;
//         }
//         setError(response.error);
//     };

//     getUsers();
//     setLoading(false);
// });