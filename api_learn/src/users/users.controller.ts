import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";

import { TYPES } from "./../../types";

import { ILogger } from "./../logger/logger.interface";

import { BaseController } from "../common/base.controller";

import { HttpError } from "./../errors/http-error.class";

import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { IUserController } from "./user.controller.interface";
import { IUserService } from "./users.service.interface";

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerServise: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
	) {
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
		const newUser = await this.userService.createUser(body);

		if (!newUser) {
			return next(new HttpError(422, "Такой пользователь уже существует"));
		}

		this.ok(res, { email: newUser.email, name: newUser.name });
	}
}
