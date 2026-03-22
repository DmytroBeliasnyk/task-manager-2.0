import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { initDB } from './db/initDB';
import { authMiddleware } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';
import { apiRouter } from './routes/api';
import { authRouter } from './routes/auth';

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
