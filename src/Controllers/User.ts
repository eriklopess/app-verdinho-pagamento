/* eslint-disable @typescript-eslint/no-useless-constructor */
import { NextFunction, Request, Response } from 'express';
import IUser from '../interfaces/User';
import Service from '../Services/Service';
import Controller from './Controller';

export default class UserController extends Controller<IUser> {
  constructor(service: Service<IUser>) {
    super(service);
  }

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
