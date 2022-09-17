import { Container, interfaces, ContainerModule } from "inversify";

import { TYPES } from "./../types";

import { App } from "./app";

import { UserController } from "./users/users.controller";
import { IUserController } from "./users/user.controller.interface";
import { IUserService } from "./users/users.service.interface";
import { UserService } from "./users/users.service";

import { LoggerService } from "./logger/loger.service";
import { ILogger } from "./logger/logger.interface";

import { ExeptionFilter } from "./errors/exeption.filter";
import { IExeptionFilter } from "./errors/exeption.filter.interface";

const modules = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);

	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);

	bind<App>(TYPES.Application).to(App);
});

const bootstrap = () => {
	const appContainer = new Container();
	appContainer.load(modules);

	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { app, appContainer };
};

export const { app, appContainer } = bootstrap();
