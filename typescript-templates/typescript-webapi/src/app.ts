import cors from 'cors';
import express, { Express } from 'express';
import * as expressWinston from 'express-winston';
import swaggerUi from 'swagger-ui-express';
import winston from 'winston';
import { SumoLogic } from 'winston-sumologic-transport';

/**
 * Always mention all your routes here so that the Routes.ts and Swagger.json
 * can be generated via tsoa library.
 */
import { HelloWorldController } from './controllers/helloWorld.controller';
import { LiveCheckController } from './controllers/live.controller';
import { SwaggerController } from './controllers/swagger.controller';

import { RegisterRoutes } from './routes';
import Swagger from './swagger.json';

export class App {
    public express: Express;
    private transport = new SumoLogic({
        url: process.env.SUMOLOGIC_URL
    });
    private logger:winston.Logger = winston.createLogger({ transports: [ this.transport ] });

    constructor() {
        this.express = express();
        this.initialize()
            .catch(e => {
                throw e;
            });
    }

    public async initialize(): Promise<void> {
        this.express.use('/swaggerui', swaggerUi.serve, swaggerUi.setup(Swagger));
        this.express.use(cors());      // Adding cors to handle cross origin requests.
        this.prepareJsonParser();
        RegisterRoutes(this.express);
        this.settingUpErrorHandler();
    }

    private prepareJsonParser() {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false}));
    }

    private settingUpErrorHandler() {
        this.express.use(
            (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                const status = err.status || 500;
                const body: any = {
                    fields: err.fields || undefined,
                    message: err.message || 'An error occured during the request.',
                    name: err.name,
                    status
                };
                res.status(status).json(body);
            }
        )
    }

    private settingUpLogger(app: Express) {
        app.use(expressWinston.logger({
            colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
            expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
            level: (req, res) => {
                if (res.statusCode >= 400) {
                    return 'error';
                }
                return 'info';
            },
            msg: 'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
            winstonInstance: this.logger,
        }));
    }
}