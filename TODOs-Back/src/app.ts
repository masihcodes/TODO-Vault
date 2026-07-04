import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { errorHandler } from "#middlewares/errorHandler.js";
import { todosRouter } from "#routes/todosRoute.js";
import { notFound } from "#middlewares/notFound.js";
import { authRouter } from "#routes/authRouter.js";

const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));

app.use('/auth', authRouter);
app.use("/todos", todosRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));