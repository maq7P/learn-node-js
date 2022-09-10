import { Container } from "inversify";

import { TYPES } from './../types';

import { UserController } from './users/users.controller';

import { App } from "./app";

import { LoggerService } from "./logger/loger.service";
import { ILogger } from './logger/logger.interface';

import { ExeptionFilter } from './errors/exeption.filter';


const appContainer = new Container();

appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<UserController>(TYPES.UserController).to(UserController);
appContainer.bind<ExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
appContainer.bind<App>(TYPES.Application).to(App);

const app = appContainer.get<App>(TYPES.Application);
app.init();

export { app, appContainer }