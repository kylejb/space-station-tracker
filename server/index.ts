import { Express, Request, Response } from 'express';
import axios from 'axios';
import express from 'express';
const { json } = require('body-parser');
import path from 'path';

export class Server {
    private app: Express;

    constructor(app: Express) {
        this.app = app;

        this.app.use(express.static(path.resolve('./') + '/build/frontend'));

        this.app.use(json());

        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header(
                'Access-Control-Allow-Headers',
                'X-Requested-With, Content-Type,Accept,X-Access-Token,X-Key',
            );
            if (process.env.NODE_ENV !== 'production') {
                res.header('Access-Control-Allow-Origin', '*');
            }
            next();
        });

        if (process.env.NODE_ENV !== 'production') {
            app.options('*', function (req, res) {
                res.sendStatus(200);
            });
        }

        this.app.get('/api', (req: Request, res: Response): void => {
            res.send('You have reached the API!');
        });

        this.app.post('/api/v1/spotthestation', async (req: Request, res: Response) => {
            const baseURL = 'https://spotthestation.nasa.gov/sightings/xml_files';
            const spotTheStationObj = {
                country: req.body.country,
                state: req.body.state,
                city: req.body.city,
            };

            try {
                const response = await axios(
                    `${baseURL}/${spotTheStationObj.country}_${spotTheStationObj.state}_${spotTheStationObj.city}.xml`,
                );
                const data = await response.data;
                // TODO: Parse data here to offload client-side work
                // console.log('DATA FROM api/v1/spotthestation -->', data)
                return res.send(data);
            } catch (error) {
                res.status(500).json({ type: 'error', message: error });
                throw new Error(error);
            }
        });

        // find nearest city based on zip/postal code
        this.app.post('/api/v1/city', async (req: Request, res: Response) => {
            const searchObject = {
                country: req.body.country,
                codes: req.body.codes,
            };
            const baseURL = 'https://app.zipcodebase.com/';
            const SEARCH_V1 = `api/v1/search?apikey=${process.env.ZIPCODEBASE_API_KEY}&country=${searchObject.country}&codes=${searchObject.codes}`;

            try {
                const response = await axios(baseURL + SEARCH_V1);
                const data = await response.data;

                const parsedResults = data.results;

                if (Array.isArray(parsedResults) && parsedResults.length === 0) {
                    return res.status(500).json({ type: 'error', message: 'No results found.' });
                }

                const responseForClient =
                    parsedResults[searchObject.codes][0]?.city_en ||
                    parsedResults[searchObject.codes][0]?.city;

                return res.json({ city: responseForClient });
            } catch (error) {
                res.status(500).json({ type: 'error', message: error });
                throw new Error(error);
            }
        });

        this.app.get('*', (req: Request, res: Response): void => {
            res.sendFile(path.resolve('./') + '/build/web/index.html');
        });
    }

    public start(port: number): void {
        this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
    }
}
