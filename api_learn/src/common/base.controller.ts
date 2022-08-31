export { Router } from "express";
import { LoggerService } from './../logger/loger.service';


export abstract class BaseController {
    private readonly _router: Router;

    constructor(private logger: LoggerService){
        this._router = Router();
    }

    get router(){
        return this._router
    }

    protected bindRoute(routes: any){

    }
}