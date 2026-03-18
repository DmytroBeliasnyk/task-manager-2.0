import express, { Router } from 'express';
import { registerController } from '../controllers/auth/auth';

export const authRouter: Router = express.Router();

authRouter.post('/register', registerController);
// authRouter.post('/login');
// authRouter.post('/logout');
// authRouter.post('/refresh');
