import express from 'express';
import supertest from 'supertest';

import { Server } from '../src/server';

const app = express();
const server = new Server(app);
const apptest = supertest(server.getExpressAppForInit());

describe('GET /api', () => {
    describe('provides stock message', () => {
        test('should respond with 200 status code and match testing object', async () => {
            await apptest
                .get('/api')
                .set('Accept', 'application/json')
                .expect(200)
                .then((response) => response.body)
                .then((body) => {
                    expect(body).toMatchObject({
                        type: 'testing',
                        message: 'You have reached the API!',
                    });
                });
        });
    });
});
