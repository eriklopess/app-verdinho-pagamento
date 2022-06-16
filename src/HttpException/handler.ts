import { Request, Response } from 'express';
import HttpException from './HttpException';

export default function handler(error: HttpException, req: Request, res: Response) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  res.status(status).json({ message });
}
