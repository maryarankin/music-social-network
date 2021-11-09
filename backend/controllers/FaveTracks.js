import FaveTrack from '../models/faveTrackModel.js';

export const getAllFaveTracks = async (req, res) => {
    try {
        const faveTracks = await FaveTrack.findAll({
            where: {
                userId: 1
            }
        });
        res.json(faveTracks);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const addFaveTrack = async (req, res) => {
    try {
        await FaveTrack.create({ trackId: req.body.trackId, userId: 1 });
        res.json({ "message": "added track" });
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const removeFaveTrack = async (req, res) => {
    try {
        await FaveTrack.destroy({
            where: {
                trackId: req.params.id,
                userId: 1
            }
        });
        res.json({ "message": "track removed" });
    } catch (error) {
        res.json({ message: error.message })
    }
}