import { NextFunction, Request, Response, Router } from "express";

import { IMiddleware } from "./middleware/middleware.interface";

export interface IControllerRoute {
	path: string;
	fx: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, "get" | "post" | "delete" | "patch" | "put">;
	middlewares?: IMiddleware[];
}
