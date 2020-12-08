import express from 'express';

import AuthController from './controllers/AuthController.js';
import ChatController from './controllers/ChatController.js';
import authMiddleware from './middlewares/auth.js';

const routes = express.Router();

routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);

routes.post('/new-chatroom', ChatController.createChatRoom);
routes.post('/new-message', ChatController.createMessage);
routes.get('/messages', ChatController.getMessages);

routes.use(authMiddleware);

export default routes;
