import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes.js";
import profileRouter from "./routes/profile.routes.js";
import queryRouter from "./routes/query.routes.js"
import projectRouter from "./routes/project.routes.js"
const app = express();

console.log(" REAL APP.JS LOADED ");

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.use(cors({
  origin: true,          // allow Postman + browser
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../frontend")));

/* test route */
app.get("/test", (req, res) => {
  res.send("SERVER WORKING");
});

/* health route */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/* routes */
app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/profile", profileRouter);

app.use("/api",queryRouter)
export default app;
