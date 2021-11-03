import User from '../models/userModel.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.json({ message: error.message });
    }
}