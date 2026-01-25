import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes.js";
import profileRouter from "./routes/profile.routes.js";

const app = express();

console.log("🔥 REAL APP.JS LOADED 🔥");

app.use(cors({
  origin: true,          // allow Postman + browser
  credentials: true
}));

app.use(express.json({ limit: "16kb" }));

app.use(cookieParser());

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
app.use("/api/profile", profileRouter);

export default app;
