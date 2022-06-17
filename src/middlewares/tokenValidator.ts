import { NextFunction, Request, Response } from 'express';
import { ResponseError } from '../Controllers/Controller';
import tokenHelper from '../helpers/token';

export default function tokenValidator(
  req: Request,
  res: Response<ResponseError>,
  next: NextFunction,
): typeof res | void {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  try {
    tokenHelper.verifyToken(token);
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
