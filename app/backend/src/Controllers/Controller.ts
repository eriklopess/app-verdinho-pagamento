import { NextFunction, Request, Response } from 'express';
import Service from '../Services/Service';

export default abstract class Controller<T> {
  constructor(protected service: Service<T>) {}

  public async findById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<typeof res | void> {
    try {
      const data = await this.service.findById(req.params.id);
      return res.status(200).json(data);
    } catch (error) {
      return next();
    }
  }
}
