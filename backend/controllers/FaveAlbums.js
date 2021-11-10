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
        const faveAlbums = await FaveAlbum.findAll({
            where: {
                albumId: req.body.albumId,
                userId: 1
            }
        });

        if (faveAlbums[0] == undefined) {
            await FaveAlbum.create({ albumId: req.body.albumId, userId: 1 });
            res.json({ "message": "added album" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const removeFaveAlbum = async (req, res) => {
    try {
        await FaveAlbum.destroy({
            where: {
                albumId: req.params.id,
                userId: 1
            }
        });
        res.json({ "message": "album removed" });
    } catch (error) {
        res.json({ message: error.message })
    }
}