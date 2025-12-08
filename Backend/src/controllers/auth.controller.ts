import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../db/connection";

const allowedEmojis = ["monkey", "dolphin", "fox", "koala", "mouse", "unicorn"];

function randomDigits() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function generateUsername(base: string) {
  let username = "";
  let exists = true;

  while (exists) {
    username = `${base}_${randomDigits()}`;

    const [rows]: any = await db.query(
      "SELECT id FROM users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) exists = false;
  }

  return username;
}

export const signup = async (req: Request, res: Response) => {
  try {
    const { password, color, emoji } = req.body;

    if (!password || !color || !emoji) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (!allowedEmojis.includes(emoji)) {
      return res.status(400).json({ message: "Invalid emoji" });
    }

    const username = await generateUsername(emoji);

    const hashed = await bcrypt.hash(password, 10);

    const [result]: any = await db.query(
      "INSERT INTO users (username, password_hash, avatar_color, avatar_emoji) VALUES (?, ?, ?, ?)",
      [username, hashed, color, emoji]
    );

    req.session.userId = result.insertId;

    res.status(201).json({ username });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const [rows]: any = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid username" });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    req.session.userId = user.id;

    res.json({ message: "Logged in" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const previewUsername = async (req: Request, res: Response) => {
  try {
    const { emoji } = req.body;

    if (!emoji) {
      return res.status(400).json({ message: "Emoji is required" });
    }

    const base = emoji.replace(/^.*\/([^\/]+)\..*/, "$1");
    const username = await generateUsername(base);

    return res.json({ username });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
};
