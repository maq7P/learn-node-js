import { ILogger } from './logger/logger.interface';
import express, { Express } from 'express';
import { Server } from "http";

import { ExeptionFilter } from './errors/exeption.filter';
import { UserController } from './users/users.controller';

export class App {
    app: Express;
    port: number;
    server: Server;
    logger: ILogger;
    userController: UserController;
    exeptionFilter: ExeptionFilter;

    constructor(logger: ILogger, userController: UserController, exeptionFilter: ExeptionFilter){
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exeptionFilter = exeptionFilter;
    }

    useRoutes(){
        this.app.use("/users", this.userController.router);
    }

    useExeptionFilter(){
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter) as any);
    }

    public async init(){
        this.useRoutes();
        this.useExeptionFilter();
        
        this.server = this.app.listen(this.port);
        this.logger.log(`liistening on ${this.port}`);
    }
}