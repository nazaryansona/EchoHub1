import { Request, Response } from "express";
import { pool } from "../db/connection";

/**
 * Get notifications for logged-in user
 */
export const getNotifications = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId: number = req.session?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const [rows]: any = await pool.query(
      `SELECT n.id, n.type, n.post_id, n.actor_id, n.is_read, n.created_at,
              a.username AS actor_username, a.avatar_color AS actor_color, a.avatar_emoji AS actor_emoji
       FROM notifications n
       JOIN users a ON a.id = n.actor_id
       WHERE n.user_id = ?
       ORDER BY n.created_at DESC
       LIMIT 200`,
      [userId]
    );

    return res.json(rows);
  } catch (err) {
    console.error("getNotifications error:", err);
    return res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

/**
 * Mark all notifications as read for user
 */
export const markAllRead = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId: number = req.session?.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    await pool.query("UPDATE notifications SET is_read = 1 WHERE user_id = ?", [
      userId,
    ]);
    return res.json({ message: "All notifications marked read" });
  } catch (err) {
    console.error("markAllRead error:", err);
    return res.status(500).json({ error: "Failed to update notifications" });
  }
};
