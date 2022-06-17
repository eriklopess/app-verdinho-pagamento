import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET } = process.env;
export = {
  createToken(email: string, role: string) { return jwt.sign({ email, role }, JWT_SECRET!, { expiresIn: '1h' }); },
  verifyToken(token: string) { return jwt.verify(token, JWT_SECRET!); },
};
