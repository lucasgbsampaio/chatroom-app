import Sequelize from 'sequelize';
import dbConfig from '../config/database.cjs';
import User from '../models/User.js';

const connection = new Sequelize(dbConfig);

User.init(connection);

export default connection;
