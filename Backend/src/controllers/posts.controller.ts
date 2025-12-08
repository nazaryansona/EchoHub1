import { Request, Response } from "express";
import { db } from "../db/connection";

export const createPost = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId: number = req.session?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const text: string = (req.body.text ?? "").trim();
    const imageUrl: string | null = req.file
      ? `/uploads/${(req.file as any).filename}`
      : req.body.image_url ?? null;

    if (!text && !imageUrl) {
      return res.status(400).json({ error: "Post must include text or image" });
    }

    const [result]: any = await db.query(
      "INSERT INTO posts (user_id, text, image_url) VALUES (?, ?, ?)",
      [userId, text || null, imageUrl]
    );

    return res
      .status(201)
      .json({ message: "Post created", postId: result.insertId });
  } catch (err) {
    console.error("createPost error:", err);
    return res.status(500).json({ error: "Failed to create post" });
  }
};

export const getFeed = async (_req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query(`
      SELECT
        p.id, p.user_id, p.text, p.image_url, p.created_at,
        u.username, u.avatar_color AS color, u.avatar_emoji AS emoji,
        (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comments_count,
        (SELECT COUNT(*) FROM reactions r WHERE r.post_id = p.id) AS reactions_count
      FROM posts p
      JOIN users u ON u.id = p.user_id
      ORDER BY p.created_at DESC
      LIMIT 200
    `);
    return res.json(rows);
  } catch (err) {
    console.error("getFeed error:", err);
    return res.status(500).json({ error: "Failed to fetch feed" });
  }
};

export const getMyPosts = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId: number = req.session?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const [rows]: any = await db.query(
      `SELECT
          p.id, p.user_id, p.text, p.image_url, p.created_at,
          u.username, u.avatar_color AS color, u.avatar_emoji AS emoji,
          (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comments_count,
          (SELECT COUNT(*) FROM reactions r WHERE r.post_id = p.id) AS reactions_count
       FROM posts p
       JOIN users u ON u.id = p.user_id
       WHERE p.user_id = ?
       ORDER BY p.created_at DESC`,
      [userId]
    );
    return res.json(rows);
  } catch (err) {
    console.error("getMyPosts error:", err);
    return res.status(500).json({ error: "Failed to fetch posts" });
  }
};
