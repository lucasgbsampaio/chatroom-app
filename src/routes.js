import express from 'express';

import AuthController from './controllers/AuthController.js';

const routes = express.Router();

routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);

export default routes;
