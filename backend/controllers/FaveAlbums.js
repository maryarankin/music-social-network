import FaveAlbum from '../models/faveAlbumModel.js';

export const getAllFaveAlbums = async (req, res) => {
    try {
        const faveAlbums = await FaveAlbum.findAll({
            where: {
                userId: 1
            }
        });
        res.json(faveAlbums);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const addFaveAlbum = async (req, res) => {
    try {
        await FaveAlbum.create({ albumId: req.body.albumId, userId: 1 });
        res.json({ "message": "album added" });
    } catch (error) {
        res.json({ message: error.message });
    }
}