import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { IMiddleware } from "./validate.middleware.interface";

export class AuthMiddleware implements IMiddleware {
	constructor(private _secret: string) {}

	execute(req: Request, res: Response, next: NextFunction) {
		const authHeader = req.headers.authorization;

		if (authHeader) {
			const token = authHeader.split(" ")[1];
			verify(token, this._secret, (err, payload) => {
				if (err) next();

				console.log("payload: ", payload);

				if (payload) {
					req.user = payload + "";
					next();
				}
			});
		}

		next();
	}
}
