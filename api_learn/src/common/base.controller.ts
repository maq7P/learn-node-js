import { Router, Response } from "express";
import { injectable } from "inversify";
import "reflect-metadata";

import { ILogger } from "./../logger/logger.interface";

import { IControllerRoute } from "./route.interface";

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router() {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T) {
		res.type("application/json");

		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T) {
		return this.send<T>(res, 200, message);
	}

	public created(res: Response) {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IControllerRoute[]) {
		for (const { method, fx, path, middlewares } of routes) {
			const hanlder = fx.bind(this);

			console.log("all: ", { method, fx, path, middlewares });

			const pipline = middlewares
				? [...middlewares.map((middleware) => middleware.execute.bind(this)), hanlder]
				: hanlder;

			console.log("cur pipline: ", pipline);

			this.router[method](path, pipline);

			this.logger.log(`${method}: ${path}`);
		}
	}
}
