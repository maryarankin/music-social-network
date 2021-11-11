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
        console.log('here');
        await User.update(req.body, {
            where: {
                userId: 1
            }
        });
        res.json({ "message": "name updated" });
    } catch (error) {
        res.json({ message: error.message })
    }
}