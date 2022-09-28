import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { sign } from "jsonwebtoken";

import { TYPES } from "../types";

import { ILogger } from "./../logger/logger.interface";
import { IConfigService } from "./../config/config.service.interface";

import { AuthGuard } from "./../common/middleware/auth/auth.guard";

import { BaseController } from "../common/base.controller";
import { ValidateMiddleware } from "../common/middleware/validate/validate.middleware";

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
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerServise);

		this.bindRoutes([
			{
				path: "/register",
				method: "post",
				fx: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: "/login",
				method: "post",
				fx: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: "/info",
				method: "get",
				fx: this.info,
				middlewares: [new AuthGuard()],
			},
		]);
	}

	async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const isValideUser = await this.userService.validateUser(body);

		if (!isValideUser) {
			return next(new HttpError(422, "Ошибка авторизации", "login"));
		}

		const jwt = await this.#signJWT(body.email, this.configService.get("SECRET"));

		this.ok(res, { jwt });
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		console.log(this.userService.createUser);

		const newUser = await this.userService.createUser(body);

		if (!newUser) {
			return next(new HttpError(422, "Такой пользователь уже существует", "register"));
		}

		this.ok(res, { email: newUser.email, name: newUser.name });
	}

	async info(
		{ user }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		this.ok(res, { email: user });
	}

	async #signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: "HS256",
				},
				(err, token) => {
					if (err) reject(err);

					resolve(token as string);
				},
			);
		});
	}
}
