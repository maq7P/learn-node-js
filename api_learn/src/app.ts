import { IConfigService } from "./config/config.service.interface";
import { AuthMiddleware } from "./common/middleware/auth.middleware";
import express, { Express } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { Server } from "http";
import { json } from "body-parser";

import { TYPES } from "./types";

import { PrismaService } from "./database/prisma.service";
import { IUserController } from "./users/user.controller.interface";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { ILogger } from "./logger/logger.interface";

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: IUserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());

		const authMiddleware = new AuthMiddleware(this.configService.get("SECRET"));
		this.app.use(authMiddleware.execute.bind(this));
	}

	useRoutes(): void {
		this.app.use("/users", this.userController.router);
	}

	useExeptionFilter(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilter();

		await this.prismaService.connect();

		this.server = this.app.listen(this.port);
		this.logger.log(`liistening on ${this.port}...`);
	}
}
