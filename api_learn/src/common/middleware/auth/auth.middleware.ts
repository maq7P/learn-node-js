import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { IMiddleware } from "../middlware.interface";

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		const authHeader = req.headers.authorization;

		new Promise((res, rej) => {
			if (authHeader) {
				const token = authHeader.split(" ")[1];

				try {
					verify(token, this.secret, (err, payload: any) => {
						if (err) next();

						if (payload) {
							req.user = payload?.email;
							next();
						}
					});
				} catch (e) {
					rej();
				}
			}
		}).catch(next);
	}
}
