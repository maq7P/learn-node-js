import { Container, interfaces, ContainerModule } from "inversify";

import { TYPES } from "./types";

import { App } from "./app";

import { PrismaService } from "./database/prisma.service";

//User
import { UserController } from "./users/users.controller";
import { IUserController } from "./users/user.controller.interface";
import { IUserService } from "./users/users.service.interface";
import { UserService } from "./users/users.service";
import { IUsersRepository } from "./users/user.repository.interface";
import { UsersRepository } from "./users/user.repository";

import { LoggerService } from "./logger/loger.service";
import { ILogger } from "./logger/logger.interface";

import { ExeptionFilter } from "./errors/exeption.filter";
import { IExeptionFilter } from "./errors/exeption.filter.interface";

import { IConfigService } from "./config/config.service.interface";
import { ConfigService } from "./config/config.service";

const modules = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();

	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();

	bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope();
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();

	bind<App>(TYPES.Application).to(App).inSingletonScope();
});

const bootstrap = () => {
	const appContainer = new Container();
	appContainer.load(modules);

	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { app, appContainer };
};

export const { app, appContainer } = bootstrap();
