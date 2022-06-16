import { Router } from 'express';
import userRouter from './userRoutes';

const routes: Router[] = [userRouter];

export default routes;
