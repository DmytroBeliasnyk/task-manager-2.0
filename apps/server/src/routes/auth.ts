import express, { Router } from 'express';

export const authRouter: Router = express.Router();

authRouter.post('/register');
authRouter.post('/login');
authRouter.post('/logout');
authRouter.post('/refresh');
