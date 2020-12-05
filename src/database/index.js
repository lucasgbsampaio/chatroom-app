import Sequelize from 'sequelize';
import dbConfig from '../config/database.cjs';
import User from '../models/User.js';
import ChatRoom from '../models/ChatRoom.js';
import Message from '../models/Message.js';

const connection = new Sequelize(dbConfig);

User.init(connection);
ChatRoom.init(connection);
Message.init(connection);

User.associate(connection.models);
ChatRoom.associate(connection.models);
Message.associate(connection.models);

export default connection;
