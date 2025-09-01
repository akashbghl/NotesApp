import express from "express";
import NoteModel from "../models/Notes";
import { verifyToken } from "../middlewares/Auth";

const NoteRoutes = express.Router();

// Create Note
NoteRoutes.post("/create", verifyToken, async (req:any, res:any) => {
  try {
    const { title, description } = req.body;
    const note = await NoteModel.create({
        user: req.user.id,
        title,
        description,
    });
    res.status(201).json({ success: true, note });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating note" });
  }
});

// Get Notes
NoteRoutes.get("/", verifyToken, async (req:any, res:any) => {
  try {
    const notes = await NoteModel.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching notes" });
  }
});

// Delete Note
NoteRoutes.delete("/:id", verifyToken, async (req, res) => {
  try {
    await NoteModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting note" });
  }
});

export default NoteRoutes;
