import UserController from './User';
import UserService from '../Services/User';
import prisma from '../client/client';

const userService = new UserService(prisma);
const userController = new UserController(userService);

export {
  userController,
};
