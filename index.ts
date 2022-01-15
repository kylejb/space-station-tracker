import { Server } from './server';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const server = new Server(app);
const port = Number(process.env.PORT) || 9000; // Heroku needs PORT var
server.start(port);
