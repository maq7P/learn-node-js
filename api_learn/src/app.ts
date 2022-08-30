import { LoggerService } from './logger/loger.service';
import express, { Express } from 'express';
import { userRouter } from './users/user';
import { Server } from "http";

export class App {
    app: Express;
    port: number;
    server: Server;
    logger: LoggerService

    constructor(){
        this.app = express();
        this.port = 8000;
        this.logger = new LoggerService()
    }

    useRoutes(){
        this.app.use("/users", userRouter);
    }

    public async init(){
        this.useRoutes();
        this.server = this.app.listen(this.port);
        this.logger.log(`liistening on ${this.port}`)
    }
}