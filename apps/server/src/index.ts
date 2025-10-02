import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from server" });
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Backend listen: http://localhost:${port}`));
