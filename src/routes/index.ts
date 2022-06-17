import { Router } from 'express';
import homeRouter from './home';
import userRouter from './userRoutes';

const routes: Router[] = [userRouter, homeRouter];

export default routes;
