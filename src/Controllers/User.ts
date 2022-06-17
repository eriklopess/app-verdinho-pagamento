/* eslint-disable @typescript-eslint/no-useless-constructor */
import { Response } from 'express';
import tokenHelper from '../helpers/token';
import HttpException from '../HttpException/HttpException';
import IUser, { ILoginUser, IUserTransfer, IUserWithIAccount } from '../interfaces/User';
import Service from '../Services/Service';
import Controller, { RequestWithBody, ResponseError } from './Controller';

export default class UserController extends Controller<IUser, IUserWithIAccount> {
  constructor(service: Service<IUser, IUserWithIAccount>) {
    super(service);
  }

  public create = async (
    req: RequestWithBody<IUser>,
    res: Response<IUser | ResponseError | void>,
  ): Promise<typeof res> => {
    try {
      const user = await this.service.create(req.body);
      if (user instanceof HttpException) throw new HttpException(user.message, user.status);
      return res.status(201).json(user);
    } catch (err) {
      if (err instanceof HttpException) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  public login = async (
    req: RequestWithBody<IUser>,
    res: Response<ILoginUser | ResponseError | void>,
  ): Promise<typeof res> => {
    const { email, password } = req.body;
    try {
      const user = await this.service.find(email) as IUser | HttpException;
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
      if (err instanceof HttpException) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  public transfer = async (
    req: RequestWithBody<IUserTransfer>,
    res: Response,
  ): Promise<typeof res> => {
    const { amount, receiver, email } = req.body;
    const user = await this.service.find(email);
    if (user instanceof HttpException) throw new HttpException(user.message, user.status);
    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.role === 'shopkeepers') { return res.status(400).json({ error: 'you are not allowed to transfer' }); }
    try {
      const transference = await this.service.update(
        user.email,
        receiver,
        amount,
      );
      if (transference instanceof HttpException) {
        throw new HttpException(
          transference.message,
          transference.status,
        );
      }
      return res.status(200).json(transference);
    } catch (err) {
      if (err instanceof HttpException) {
        return res.status(err.status).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
