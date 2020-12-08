import express from 'express';

import AuthController from './controllers/AuthController.js';
import ChatController from './controllers/ChatController.js';
import authMiddleware from './middlewares/auth.js';

const routes = express.Router();

routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);

routes.use(authMiddleware);
routes.post('/chatroom/:id', ChatController.newChatRoomAndDisplayMessages);
routes.post('/message/:id', ChatController.createMessage);

export default routes;
