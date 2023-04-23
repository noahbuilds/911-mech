import 'reflect-metadata';
import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApiError } from './utilities/apiError';
import mongoose, { ConnectOptions } from 'mongoose';
import {
    contractorRouter,
    clientAuthRouter,
    contractorAuthRouter,
    clientRouter,
} from './routes/index';
import { auth } from './middlewares/auth';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

class App {
    public port: number;
    public express: Application;
    private mongoURI: string;
    constructor(port: number, mongoURI: string) {
        this.port = port;
        this.mongoURI = mongoURI;
        this.express = express();
        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers();
        this.initializeErrorHandling();
    }

    private async initializeDatabaseConnection(): Promise<void> {
        try {
            await mongoose.connect(this.mongoURI!, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            } as ConnectOptions);
            return console.log(`Successfully connected to ${this.mongoURI}`);
        } catch (error) {
            console.log('Error connecting to database: ', error);
            return process.exit(1);
        }
    }

    private initializeMiddleware(): void {
        this.express.use(express.json());

        // parse urlencoded request body
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(compression());
    }

    private initializeControllers(): void {
        this.express.use('/api/v1/contractor', contractorRouter);
        this.express.use('/api/v1/client', clientRouter);
        this.express.use('/api/v1/client-auth', clientAuthRouter);
        this.express.use('/api/v1/contractor-auth', contractorAuthRouter);
    }

    private initializeErrorHandling(): void {
        this.express.use((req: Request, res: Response, next) => {
            next(new ApiError(httpStatus.NOT_FOUND, 'Not Found'));
        });
    }

    public startListener(): void {
        this.express.listen(this.port, () => {
            console.log(`App is running on PORT ${this.port}`);
        });
    }
}

export { App };
