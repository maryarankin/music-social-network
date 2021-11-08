import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const FaveTrack = db.define('faveTracks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    trackId: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.INTEGER
    }
},
    {
        freezeTableName: true
    });

export default FaveTrack;