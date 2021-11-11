import express from 'express';
import { getAllUsers, updateName } from '../controllers/Users.js';

const router = express.Router();

router.get('/', getAllUsers);

router.patch('/edit', updateName);

export default router;