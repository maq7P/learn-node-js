import { LoggerService } from './../logger/loger.service';
import { HttpError } from './http-error.class';
import { IExeptionFilter } from './exeption.filter.interface';
import { NextFunction, Request, Response } from 'express';


export class ExeptionFilter implements IExeptionFilter {
    logger: LoggerService;

    constructor(logger: LoggerService){
        this.logger = logger;
    }

    catch(err: Error | HttpError, res: Response, req: Request, next: NextFunction){
        if(err instanceof Error) {
            this.logger.error(`${err.message}`);
            res.status(500).send({err: err.message});
        }

        if(err instanceof HttpError) {
            this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
            res.status(err.statusCode).send({err: err.message});
        }
    }
}