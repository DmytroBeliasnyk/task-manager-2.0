import express, { Router } from 'express';
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
} from '../controllers/auth/auth';

export const authRouter: Router = express.Router();

authRouter.post('/register', registerController);
authRouter.post('/login', loginController);
authRouter.get('/refresh', refreshTokenController);
authRouter.post('/logout', logoutController);
