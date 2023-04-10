import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.js";
import taskRoutes from "./routes/task.js";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

// create server
export const app = express();

config({
  path: "./data/config.env",
});

// middelware
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONT_END_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/users", userRoutes);
app.use("/task", taskRoutes);
app.set("view engine", "ejs");

app.use(errorMiddleware);
