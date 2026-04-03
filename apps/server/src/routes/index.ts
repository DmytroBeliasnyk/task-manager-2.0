import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { apiRouter } from './api';
import { authRouter } from './auth';

export const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/', authMiddleware, apiRouter);
