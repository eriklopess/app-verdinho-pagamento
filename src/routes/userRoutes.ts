import { Router } from 'express';
import { userController } from '../Controllers';

const userRouter = Router();

userRouter.get('/api/users/:id', userController.findById);

export default userRouter;
