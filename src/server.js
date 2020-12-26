import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';

import WebSockets from './utils/WebSockets.js';
import routes from './routes.js';
import './database/index.js';

dotenv.config();

const __dirname = path.resolve();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://chat-pern.herokuapp.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(bodyParser.json());
app.use('/api', routes);
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

WebSockets(io);

server.listen(process.env.PORT || 5000, () => console.log('Server iniciado'));
