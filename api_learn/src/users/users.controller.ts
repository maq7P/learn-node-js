import { NextFunction, Request, Response } from 'express';

import { LoggerService } from './../logger/loger.service';
import { BaseController } from "../common/base.controller";

export class UserController extends BaseController{
    constructor(logger: LoggerService){
        super(logger);

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