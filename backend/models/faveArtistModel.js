import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const FaveArtist = db.define('faveArtists', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    artistId: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.INTEGER
    }
},
    {
        freezeTableName: true
    });

export default FaveArtist;