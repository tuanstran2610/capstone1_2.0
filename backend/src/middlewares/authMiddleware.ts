import { Request, Response, NextFunction } from "express";

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Not authenticated" });
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  const user: any = req.user;
  if (user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admin only" });
  }
  next();
}
