import express from "express";
import { verifyToken } from "../middlewares/Auth";

const router = express.Router();

router.get("/dashboard", verifyToken, (req, res) => {
  const user = (req as any).user;
  return res.status(200).json({ success:true ,user});
});

export default router;
