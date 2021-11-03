import { Sequelize } from 'sequelize';

const db = new Sequelize('music_mates', 'mary', '1004', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;