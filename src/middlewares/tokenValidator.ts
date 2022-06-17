import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ResponseError } from '../Controllers/Controller';
import tokenHelper from '../helpers/token';

interface RequestWithUser extends Request {
  user?: JwtPayload;
}

export default function tokenValidator(
  req: RequestWithUser,
  res: Response<ResponseError>,
  next: NextFunction,
): typeof res | void {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  try {
    const decoded = tokenHelper.verifyToken(token);
    req.user = decoded as JwtPayload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
