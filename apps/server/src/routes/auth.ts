import express, { Router } from 'express';
import {
  registerController,
  loginController,
  refreshTokenController,
  logoutController,
} from '../controllers/auth/auth';

export const authRouter: Router = express.Router();

authRouter.post('/register', registerController);
authRouter.post('/login', loginController);
authRouter.get('/refresh', refreshTokenController);
authRouter.get('/logout', logoutController);
