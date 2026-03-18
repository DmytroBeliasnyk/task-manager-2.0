import express, { Application } from 'express';
import cors from 'cors';
import { initDB } from './db/initDB';
import { apiRouter } from './routes/api';
import { errorHandler } from './middleware/errorHandler';
import { authRouter } from './routes/auth';
import { authMiddleware } from './middleware/auth';
import cookieParser from 'cookie-parser';

(async (): Promise<void> => {
  try {
    await initDB();
  } catch (err) {
    console.error('DB init error: ', err);
    process.exit(1);
  }

  const PORT = process.env.PORT || 8000;
  const app: Application = express();

  app.use(cookieParser());
  app.use(
    cors({
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true,
    }),
  );
  app.use(express.json());
  app.use('/auth', authRouter);
  app.use(authMiddleware);
  app.use('/api', apiRouter);
  app.use(errorHandler);

  app.listen(PORT, () => console.log(`server connected on port ${PORT}`));
})();
