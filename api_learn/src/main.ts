import { Container, interfaces, ContainerModule } from "inversify";

import { TYPES } from "./../types";

import { UserController } from "./users/users.controller";

import { App } from "./app";

import { LoggerService } from "./logger/loger.service";
import { ILogger } from "./logger/logger.interface";

import { ExeptionFilter } from "./errors/exeption.filter";

const modules = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<UserController>(TYPES.IUserController).to(UserController);
	bind<ExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
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
