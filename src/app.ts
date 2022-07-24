import express, { Request, Response, NextFunction } from "express"
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import contactsRouter from "./routes/contacts/index";



const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(helmet());
app.use(logger(formatsLogger));
app.use(express.static('public'))
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  res.status(status).json({
    status: status === 500 ? "fail" : "error",
    code: status,
    message: err.message,
  });
});

module.exports = app;
