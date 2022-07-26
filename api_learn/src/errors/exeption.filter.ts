import { Logger } from "tslog";
import e, { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";

import { ILogger } from "./../logger/logger.interface";
import { TYPES } from "../types";

import { HttpError } from "./http-error.class";
import { IExeptionFilter } from "./exeption.filter.interface";

@injectable()
export class ExeptionFilter implements IExeptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction) {
		if (err instanceof HttpError) {
			this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);

			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error(`${err.message}`);

			res.status(500).send({ err: err.message });
		}
	}
}
