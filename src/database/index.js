import Sequelize from 'sequelize';
import dbConfig from '../config/database.cjs';
import User from '../models/User.js';
import ChatRoom from '../models/ChatRoom.js';
import Message from '../models/Message.js';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

console.log(process.env.NODE_ENV);
const PRODUCTION_CONNECTION =
  (process.env.DATABASE_URL,
  {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true,
    },
  });

const connection = new Sequelize(
  isProduction ? PRODUCTION_CONNECTION : dbConfig
);

User.init(connection);
ChatRoom.init(connection);
Message.init(connection);

User.associate(connection.models);
ChatRoom.associate(connection.models);
Message.associate(connection.models);

export default connection;
