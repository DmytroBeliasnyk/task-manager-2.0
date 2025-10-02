import express, {Application} from "express";
import {apiRouter} from "./routes/api";
import {initDB} from "./db/initDB";

(async (): Promise<void> => {
  try {
    await initDB()
  } catch (err) {
    console.error('DB init error: ', err)
    process.exit(1)
  }

  const PORT: number = 8000
  const app: Application = express()

  app.use(express.json())
  app.use('/api', apiRouter)

  app.listen(PORT, () => console.log(`server connected on port ${PORT}`))
})()