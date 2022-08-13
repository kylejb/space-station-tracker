import axios from 'axios';
import { json } from 'body-parser';
import express, { Express, Request, Response } from 'express';
import { XMLParser } from 'fast-xml-parser';
import path from 'path';

import { cleanTableData } from './cleanTableData';
import { SpotTheStationResponse } from './types';

// TODO: Replace type 'any' with proper types/interface
export class Server {
    private readonly app: Express;

    constructor(app: Express) {
        this.app = app;
        this.app.disable('x-powered-by'); // security

        this.app.use(express.static(path.resolve('./') + '/build/web'));

        this.app.use(json());

        this.app.use((req: Request, res: Response, next) => {
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
            this.app.options('*', (req: Request, res: Response) => {
                res.sendStatus(200);
            });
        }

        this.app.get('/api', (req: Request, res: Response): void => {
            res.json({ type: 'testing', message: 'You have reached the API!' });
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
                const parser = new XMLParser();
                const jObj: SpotTheStationResponse = parser.parse(data);
                const cleanData = cleanTableData(jObj.rss.channel.item);
                return res.send(cleanData);
            } catch (error: any) {
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
            } catch (error: any) {
                res.status(500).json({ type: 'error', message: error });
                throw new Error(error);
            }
        });

        this.app.get('*', (req: Request, res: Response): void => {
            res.sendFile(path.resolve('./') + '/build/web/index.html');
        });
    }

    // TODO: Revisit
    public getExpressAppForInit(): Express {
        return this.app;
    }

    public start(port: number): void {
        this.app.listen(port, () => console.log(`Server listening on port ${port}`));
    }
}
