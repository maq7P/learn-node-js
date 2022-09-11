import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import "reflect-metadata";

import { TYPES } from './../../types';

import { ILogger } from './../logger/logger.interface';
import { BaseController } from "../common/base.controller";

import { IUserController } from './user.controller.interface';


@injectable()
export class UserController extends BaseController implements IUserController{
    constructor(@inject(TYPES.ILogger) private loggerServise: ILogger){
        super(loggerServise);

        this.bindRoutes([
            {path: "/register", method: "post", foo: this.register},
            {path: "/login", method: "post", foo: this.login}
        ])
    }

    login(req: Request, res: Response, next: NextFunction){
        this.ok(res, "login")
    }
    
    register(req: Request, res: Response, next: NextFunction){
        this.ok(res, "register")
    }
}