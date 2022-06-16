import { PrismaClient } from '@prisma/client';
import UserController from './User';
import UserService from '../Services/User';

const prisma = new PrismaClient();

const userService = new UserService(prisma);
const userController = new UserController(userService);

export {
  userController,
};
