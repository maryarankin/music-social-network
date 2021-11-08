import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const User = db.define('users', {
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    favoriteTracks: {
        type: DataTypes.STRING
    },
    favoriteArtists: {
        type: DataTypes.STRING
    },
    favoriteAlbums: {
        type: DataTypes.STRING
    }
},
    {
        freezeTableName: true
    });

export default User;