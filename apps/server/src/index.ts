import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { initDB } from './db/initDB';
import { errorHandler } from './middleware/errorHandler';
import { rootRouter } from './routes';

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

  app.use('/api', rootRouter);

  app.use(errorHandler);

  app.listen(PORT, () => console.log(`server connected on port ${PORT}`));
})();
