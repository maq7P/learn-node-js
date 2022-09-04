import { IExeptionFilter } from './exeption.filter.interface';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from './../logger/loger.service';


export class ExeptionFilter implements IExeptionFilter{
    logger: LoggerService;

    constructor(logger: LoggerService){
        this.logger = logger
    }

    catch(err: Error, res: Response, req: Request, next: NextFunction){
        this.logger.error(`${err.message}`);
        res.status(500).send({err: err.message});
    }
}