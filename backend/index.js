import express from 'express';
import db from './config/database.js';
import userRoutes from './routes/index.js';
import cors from 'cors';

const app = express();

try {
    await db.authenticate();
    console.log('database connected');
} catch (error) {
    console.error('error: ', error);
}

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(3001, () => console.log('server running at port 3001'));

