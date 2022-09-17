import express, { Express } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { Server } from "http";
import { json } from "body-parser";

import { TYPES } from "./../types";

import { ILogger } from "./logger/logger.interface";

import { ExeptionFilter } from "./errors/exeption.filter";
import { UserController } from "./users/users.controller";

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
	}

	useRoutes(): void {
		this.app.use("/users", this.userController.router);
	}

	useExeptionFilter(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter) as any);
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilter();

		this.server = this.app.listen(this.port);
		this.logger.log(`liistening on ${this.port}...`);
	}
}
