import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

dotenv.config();

function generateToken(params = {}) {
  return jwt.sign(params, process.env.APP_SECRET, {
    expiresIn: 86400,
  });
}

export default {
  async register(req, res) {
    const { username, password } = req.body;

    try {
      if (!username || !password) {
        throw new Error();
      }
      const result = await User.findOne({ where: { username } });

      if (result) {
        res.status(400).send({ error: 'Usuário já existe' });
      }

      const user = await User.create({ username, password });

      user.password = undefined;

      res.status(200).send({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error });
    }
  },

  async login(req, res) {
    const { username, password } = req.body;

    try {
      if (!username || !password) {
        throw new Error();
      }

      const user = await User.findOne({ where: { username } });

      if (!user) {
        res.status(400).send({ error: 'Dados inválidos' });
      }

      const userMatch = await bcrypt.compare(password, user.password);

      if (!userMatch) {
        res.status(400).send({ error: 'Dados inválidos' });
      }

      user.password = undefined;

      res.status(200).send({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (error) {
      res.status(400).send({ error: 'Campos vazios' });
    }
  },
};
