import dotenv from 'dotenv';
import express from 'express';

import { Server } from './server';

dotenv.config();

const app = express();
const server = new Server(app);
const port = Number(process.env.PORT ?? '9000');
server.start(port);
