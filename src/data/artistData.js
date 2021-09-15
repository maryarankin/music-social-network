/* basic artist data to use until begin using spotify api */

import artistPicture from '../assets/taylor-swift.jpg'

export const artistData = {
    artistName: 'Taylor Swift',
    artistPicture,
    artistGenre: 'Pop',
    artistAlbums: [
        {
            id: 1,
            albumName: 'Taylor Swift',
            albumYear: 2006
        },
        {
            id: 2,
            albumName: 'Fearless',
            albumYear: 2008
        },
        {
            id: 3,
            albumName: 'Speak Now',
            albumYear: 2010
        },
        {
            id: 4,
            albumName: 'Red',
            albumYear: 2012
        },
        {
            id: 5,
            albumName: '1989',
            albumYear: 2014
        },
        {
            id: 6,
            albumName: 'Reputation',
            albumYear: 2017
        },
        {
            id: 7,
            albumName: 'Lover',
            albumYear: 2019
        },
        {
            id: 8,
            albumName: 'Folklore',
            albumYear: 2020
        },
        {
            id: 9,
            albumName: 'Evermore',
            albumYear: 2020
        },
    ],
    artistSongs: [
        {
            songName: 'I Knew You Were Trouble',
            songAlbum: 'Red'
        },
        {
            songName: 'Blank Space',
            songAlbum: '1989'
        },
        {
            songName: 'Ready For It...?',
            songAlbum: 'Reputation'
        }
    ]
}