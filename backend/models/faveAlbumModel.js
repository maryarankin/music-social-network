import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const FaveAlbum = db.define('faveAlbums', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    albumId: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.INTEGER
    }
},
    {
        freezeTableName: true
    });

export default FaveAlbum;