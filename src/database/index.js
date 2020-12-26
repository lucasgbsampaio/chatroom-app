import Sequelize from 'sequelize';
import dbConfig from '../config/database.cjs';
import User from '../models/User.js';
import ChatRoom from '../models/ChatRoom.js';
import Message from '../models/Message.js';
import dotenv from 'dotenv';

dotenv.config();

const connection = new Sequelize(
  'postgres://goperoiyoyjeyx:0abad3db668f8ffc3b7c2ae592029743093114b01961aace9b27da5e0cfa1423@ec2-100-25-231-126.compute-1.amazonaws.com:5432/dauqq62rfnbvam'
);

User.init(connection);
ChatRoom.init(connection);
Message.init(connection);

User.associate(connection.models);
ChatRoom.associate(connection.models);
Message.associate(connection.models);

export default connection;
