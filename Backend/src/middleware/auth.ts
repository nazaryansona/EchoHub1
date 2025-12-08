// middleware/auth.ts
export const requireLogin = (req, res, next) => {
  if (req.session?.userId) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
