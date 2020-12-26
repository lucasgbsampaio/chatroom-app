import Sequelize from 'sequelize';
import dbConfig from '../config/database.cjs';
import User from '../models/User.js';
import ChatRoom from '../models/ChatRoom.js';
import Message from '../models/Message.js';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.DATABASE_URL;

const PRODUCTION_CONFIG =
  (process.env.DATABASE_URL,
  {
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  });

const connection = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
});

console.log(connection);

User.init(connection);
ChatRoom.init(connection);
Message.init(connection);

User.associate(connection.models);
ChatRoom.associate(connection.models);
Message.associate(connection.models);

export default connection;
