import User from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const updateName = async (req, res) => {
    try {
        await User.update({ username: req.body.name }, {
            where: {
                userId: req.params.id
            }
        });
        res.json({ "message": "name updated" });
    } catch (error) {
        res.json({ message: error.message })
    }
}