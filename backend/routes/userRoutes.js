import express from 'express';
import { getAllUsers, getUser, updateName } from '../controllers/Users.js';

const router = express.Router();

router.get('/', getAllUsers);

router.get('/1', getUser);

router.patch('/edit', updateName);

export default router;