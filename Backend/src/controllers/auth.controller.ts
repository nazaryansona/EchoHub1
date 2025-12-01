import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../db/connection";

const generateUsername = () => {
  const animals = [
    "otter",
    "lion",
    "fox",
    "owl",
    "wolf",
    "bear",
    "dolphin",
    "koala",
    "monkey",
    "unicorn",
    "mouse",
  ];
  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "black",
    "orange",
    "teal",
    "pink",
  ];
  return `${colors[Math.floor(Math.random() * colors.length)]}-${
    animals[Math.floor(Math.random() * animals.length)]
  }-${Math.floor(Math.random() * 9000) + 1000}`;
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { password, color, emoji } = req.body;
    if (!password || !color || !emoji)
      return res.status(400).json({ error: "Missing fields" });

    const username = generateUsername();
    const password_hash = await bcrypt.hash(password, 10);

    const [result]: any = await db.query(
      "INSERT INTO users (username, password_hash, avatar_color, avatar_emoji) VALUES (?, ?, ?, ?)",
      [username, password_hash, color, emoji]
    );

    const userId = result.insertId;

    // store in session
    // @ts-ignore
    req.session.userId = userId;
    // @ts-ignore
    req.session.username = username;

    return res.json({ message: "Signed up", username });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Signup failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "Missing fields" });

    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (rows.length === 0)
      return res.status(400).json({ error: "User not found" });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });

    // save in session
    // @ts-ignore
    req.session.userId = user.id;
    // @ts-ignore
    req.session.username = user.username;

    return res.json({ message: "Logged in", username: user.username });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Login failed" });
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Failed to destroy session:", err);
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("echohub_sid");
    return res.json({ message: "Logged out" });
  });
};

export const me = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.session?.userId;
  if (!userId) return res.json({ user: null });

  const [rows]: any = await db.query(
    "SELECT id, username, avatar_color, avatar_emoji, created_at FROM users WHERE id = ?",
    [userId]
  );
  if (rows.length === 0) return res.status(404).json({ user: null });
  return res.json({ user: rows[0] });
};
