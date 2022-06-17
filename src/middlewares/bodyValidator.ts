import { NextFunction, Response, Request } from 'express';
import { Schema } from 'joi';

export default (schema: Schema) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const [message] = error.message.split('|');
    return res.status(400).json({ error: message });
  }
  return next();
};
