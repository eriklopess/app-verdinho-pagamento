import { Router } from 'express';
import { userController } from '../Controllers';

const userRouter = Router();

userRouter.post('/api/users', userController.create);

export default userRouter;
