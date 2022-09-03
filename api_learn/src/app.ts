import express, { Express } from 'express';
import { Server } from "http";

import { UserController } from './users/users.controller';
import { LoggerService } from './logger/loger.service';

export class App {
    app: Express;
    port: number;
    server: Server;
    logger: LoggerService
    userController: UserController

    constructor(logger: LoggerService, userController: UserController){
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController
    }

    useRoutes(){
        this.app.use("/users", this.userController.router);
    }

    public async init(){
        this.useRoutes();
        this.server = this.app.listen(this.port);
        this.logger.log(`liistening on ${this.port}`)
    }
}