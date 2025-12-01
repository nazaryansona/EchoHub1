import express from "express";
import userRouter from "./routes/auth.routes";

const app = express();
app.get("/", (_req, res) => res.send("Server running"));
app.listen(3000, () => console.log("Server on port 3000"));
app.use("/users", userRouter);
