import express from 'express';

import AuthController from './controllers/AuthController.js';
import authMiddleware from './middlewares/auth.js';

const routes = express.Router();

routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);

routes.use(authMiddleware);

export default routes;
