import { Router } from 'express';
import { userController } from '../Controllers';
import bodyValidator from '../middlewares/bodyValidator';
import tokenValidator from '../middlewares/tokenValidator';
import create from '../schemas/create';
import login from '../schemas/login';
import transfer from '../schemas/transfer';

const userRouter = Router();

userRouter.post('/api/users', bodyValidator(create), userController.create);
userRouter.post('/api/auth', bodyValidator(login), userController.login);
userRouter.post('/api/transfer', bodyValidator(transfer), tokenValidator, userController.transfer);

export default userRouter;
