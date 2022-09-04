import { NextFunction, Request, Response } from 'express';

export interface IExeptionFilter {
    catch(err: Error, res: Response, req: Request, next: NextFunction): void
}