import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET:any = process.env.JWT_SECRET;

interface JwtPayload {
  userId: string;
  email: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token; 
    if (!token) {
      return res.status(401).json({ message: "No token, not authorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;

    next(); //authenticated now
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
