import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";

import { TYPES } from "./../../types";

import { ILogger } from "./../logger/logger.interface";
import { BaseController } from "../common/base.controller";

import { User } from "./user.entity";

import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";

import { IUserController } from "./user.controller.interface";

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerServise: ILogger) {
		super(loggerServise);

		this.bindRoutes([
			{ path: "/register", method: "post", foo: this.register },
			{ path: "/login", method: "post", foo: this.login },
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		this.ok(res, "login");
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const newUser = new User(body.name, body.email);
		console.log(body.name, body.email);

		await newUser.setPassword(body.password);

		this.ok(res, newUser);
	}
}
