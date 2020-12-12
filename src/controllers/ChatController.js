import Sequelize from 'sequelize';

import User from '../models/User.js';
import ChatRoom from '../models/ChatRoom.js';
import Message from '../models/Message.js';
import sequelize from 'sequelize';

export default {
  async newChatRoomAndDisplayMessages(req, res) {
    const { id } = req.params;
    const user_id = req.userId;

    try {
      const user1 = await User.findByPk(user_id);
      const user2 = await User.findByPk(id);

      const [chatroom, created] = await ChatRoom.findOrCreate({
        where: {
          participants_id: {
            // se [1,3] está em [[1,3],[3,1]]
            // ou [3,1] está em [[1,3],[3,1]]
            [Sequelize.Op.in]: [
              [user_id, parseInt(id)],
              [parseInt(id), user_id],
            ],
          },
        },
        defaults: {
          participants_id: [user_id, parseInt(id)],
        },
      });

      if (created) {
        await user1.addChatRoom(chatroom);
        await user2.addChatRoom(chatroom);
      }

      const messages = await Message.findAll({
        where: { chat_id: chatroom.id },
      });

      if (messages.length === 0) return res.status(200).json(chatroom);

      return res.status(200).json(messages);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao cadastrar ChatRoom' });
    }
  },

  async createMessage(req, res) {
    const { id } = req.params;
    const { message_text, chat_id } = req.body;

    try {
      const user = await User.findByPk(id);

      const message = await Message.create({
        message_text,
        chat_id,
        sender_user: user.username,
      });

      return res.status(200).json(message);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao enviar Mensagem' });
    }
  },

  async showUsers(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      const users = await User.findAll({
        attributes: { exclude: ['password'] },
        where: { id: { [sequelize.Op.not]: req.userId } },
      });

      return res.status(200).json({ user: user.username, users });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao listar Usuários' });
    }
  },
};
