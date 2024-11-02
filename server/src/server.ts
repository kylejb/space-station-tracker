import axios from 'axios';
import { json } from 'body-parser';
import express, { type Express, type Request, type Response } from 'express';
import { XMLParser } from 'fast-xml-parser';
import path from 'path';
import rateLimit from 'express-rate-limit';

import geoMap from './data/geoMap.json';
import { cleanTableData } from './cleanTableData';
import type { GeoMap, ValidCountry, ValidState, SpotTheStationResponse } from './types';

export class Server {
    private readonly app: Express;

    private readonly geoMap: GeoMap = geoMap;

    private readonly supportedCountries = new Set(Object.keys(geoMap));

    constructor(app: Express) {
        this.app = app;
        this.app.disable('x-powered-by'); // security

        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            limit: 100,
        });

        this.app.use(limiter);

        this.app.use(express.static(path.resolve('../dist/web')));

        this.app.use(json());

        this.app.use((_: Request, res: Response, next) => {
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
            this.app.options('/', (_: Request, res: Response) => {
                res.sendStatus(200);
            });
        }

        this.app.get('/api', (_: Request, res: Response): void => {
            res.json({ type: 'testing', message: 'You have reached the API!' });
        });

        this.app.post(
            '/api/v1/spotthestation',
            async (req: Request, res: Response): Promise<void> => {
                const baseURL = 'https://spotthestation.nasa.gov/sightings/xml_files';

                const spotTheStationObj = {
                    country: req.body.country,
                    state: req.body.state,
                    city: req.body.city,
                };

                if (
                    !this.supportedCountries.has(spotTheStationObj.country) ||
                    !this.isValidState(spotTheStationObj.country, spotTheStationObj.state) ||
                    !this.isValidCity(
                        spotTheStationObj.country,
                        spotTheStationObj.state,
                        spotTheStationObj.city,
                    )
                ) {
                    res.status(400).json({ type: 'error', message: 'Invalid input' });
                    return;
                }

                try {
                    const response = await axios(
                        `${baseURL}/${spotTheStationObj.country}_${spotTheStationObj.state}_${spotTheStationObj.city}.xml`,
                    );
                    const data = await response.data;
                    const parser = new XMLParser();
                    const jObj: SpotTheStationResponse = parser.parse(data);
                    const cleanData = cleanTableData(jObj.rss.channel.item);
                    res.send(cleanData);
                    return;
                } catch (err) {
                    res.sendStatus(500).json({
                        type: 'error',
                        message: err instanceof Error ? err.message : err,
                    });
                    throw err;
                }
            },
        );

        // find nearest city based on zip/postal code
        this.app.post('/api/v1/city', async (req: Request, res: Response): Promise<void> => {
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
                    res.sendStatus(500).json({ type: 'error', message: 'No results found.' });
                    return;
                }

                const responseForClient =
                    parsedResults[searchObject.codes][0]?.city_en ||
                    parsedResults[searchObject.codes][0]?.city;

                res.json({ city: responseForClient });
                return;
            } catch (err) {
                res.sendStatus(500).json({
                    type: 'error',
                    message: err instanceof Error ? err.message : err,
                });
            }
        });

        this.app.get('/', (_: Request, res: Response): void => {
            res.sendFile(path.resolve('../dist/web/index.html'));
        });
    }

    // TODO: Revisit
    public getExpressAppForInit(): Express {
        return this.app;
    }

    public start(port: number): void {
        this.app.listen(port, () => console.log(`Server listening on port ${port}`));
    }

    private isValidState<Country extends ValidCountry>(
        country: Country,
        state: ValidState<Country>,
    ): boolean {
        return state in this.geoMap[country];
    }

    private isValidCity<Country extends ValidCountry>(
        country: Country,
        state: ValidState<Country>,
        city: string,
    ): boolean {
        return this.geoMap[country][state]?.some((point) => point.city === city);
    }
}
