/* eslint-disable @typescript-eslint/no-useless-constructor */
import { Response } from 'express';
import tokenHelper from '../helpers/token';
import HttpException from '../HttpException/HttpException';
import IUser, { ILoginUser } from '../interfaces/User';
import Service from '../Services/Service';
import Controller, { RequestWithBody, ResponseError } from './Controller';

export default class UserController extends Controller<IUser> {
  constructor(service: Service<IUser>) {
    super(service);
  }

  create = async (
    req: RequestWithBody<IUser>,
    res: Response<IUser | ResponseError | void>,
  ): Promise<typeof res> => {
    try {
      const user = await this.service.create(req.body);
      if (user instanceof HttpException) throw new HttpException(user.message, user.status);
      return res.status(201).json(user);
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  login = async (
    req: RequestWithBody<IUser>,
    res: Response<ILoginUser | ResponseError | void>,
  ): Promise<typeof res> => {
    const { email, password } = req.body;
    try {
      const user = await this.service.find(email);
      if (user instanceof HttpException) throw new HttpException(user.message, user.status);
      if (password === user.password) {
        const token = tokenHelper.createToken(email, user.role!) as string;
        return res.status(200).json({
          ...user,
          token,
        });
      }
      return res.status(401).json({ error: 'Invalid password' });
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
