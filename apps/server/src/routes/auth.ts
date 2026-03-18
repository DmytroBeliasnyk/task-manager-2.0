import express, { Router } from 'express';
import {
  registerController,
  loginController,
  refreshTokenController,
} from '../controllers/auth/auth';

export const authRouter: Router = express.Router();

authRouter.post('/register', registerController);
authRouter.post('/login', loginController);
// authRouter.post('/logout');
authRouter.get('/refresh', refreshTokenController);
