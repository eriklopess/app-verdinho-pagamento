import { NextFunction, Request, Response } from 'express';
import Service from '../Services/Service';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}
export default abstract class Controller<T, U> {
  constructor(protected service: Service<T, U>) {
  }

  abstract create(req: RequestWithBody<T>,
    res: Response<T | ResponseError | void>,
    next: NextFunction):
  Promise<typeof res>;
}
