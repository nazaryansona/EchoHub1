// server.ts
import express from "express";
import session from "express-session";
import MySQLStoreFactory from "express-mysql-session";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./db/connection";

import authRoutes from "./routes/auth.routes";
import postsRoutes from "./routes/posts.routes";
import commentsRoutes from "./routes/comments.routes";
import reactionsRoutes from "./routes/reactions.routes";
import notificationsRoutes from "./routes/notifications.routes";

dotenv.config();

// MySQL session store
const MySQLStore = MySQLStoreFactory(session);
const store = new MySQLStore({}, db as any);

const app = express();

// Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // allow cookies
  })
);

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
    },
  })
);

// Public folder for uploaded images
app.use("/uploads", express.static("uploads"));

// Test route
app.get("/", (_req, res) => res.send("Server running"));

// Mount all routes
app.use("/auth", authRoutes);
app.use("/posts", postsRoutes);
app.use("/comments", commentsRoutes);
app.use("/reactions", reactionsRoutes);
app.use("/notifications", notificationsRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
