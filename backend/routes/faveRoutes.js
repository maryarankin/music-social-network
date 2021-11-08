import express from 'express';
import { getAllFaveAlbums } from '../controllers/FaveAlbums.js';
import { getAllFaveArtists } from '../controllers/FaveArtists.js';
import { getAllFaveTracks } from '../controllers/FaveTracks.js';
import { addFaveAlbum } from '../controllers/FaveAlbums.js';
import { addFaveArtist } from '../controllers/FaveArtists.js';
import { addFaveTrack } from '../controllers/FaveTracks.js';
import { removeFaveAlbum } from '../controllers/FaveAlbums.js';

const router = express.Router();

router.get('/albums', getAllFaveAlbums);

router.get('/artists', getAllFaveArtists);

router.get('/tracks', getAllFaveTracks);

router.post('/albums', addFaveAlbum);

router.post('/artists', addFaveArtist);

router.post('/tracks', addFaveTrack);

router.delete('/albums/:id', removeFaveAlbum);

export default router;