import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';

import routes from './routes.js';
import './database/index.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', () => {});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

server.listen(process.env.PORT || 8080, () => console.log('Server iniciado'));
