import FaveArtist from '../models/faveArtistModel.js';

export const getAllFaveArtists = async (req, res) => {
    try {
        const faveArtists = await FaveArtist.findAll({
            where: {
                userId: 1
            }
        });
        res.json(faveArtists);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const addFaveArtist = async (req, res) => {
    try {
        const faveArtists = await FaveArtist.findAll({
            where: {
                artistId: req.body.artistId,
                userId: 1
            }
        });

        if (faveArtists[0] == undefined) {
            await FaveArtist.create({ artistId: req.body.artistId, userId: 1 });
            res.json({ "message": "added artist" });
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const removeFaveArtist = async (req, res) => {
    try {
        await FaveArtist.destroy({
            where: {
                artistId: req.params.id,
                userId: 1
            }
        });
        res.json({ "message": "artist removed" });
    } catch (error) {
        res.json({ message: error.message })
    }
}