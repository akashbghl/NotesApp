"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Notes_1 = __importDefault(require("../models/Notes"));
const Auth_1 = require("../middlewares/Auth");
const NoteRoutes = express_1.default.Router();
// Create Note
NoteRoutes.post("/create", Auth_1.verifyToken, async (req, res) => {
    try {
        const { title, description } = req.body;
        const note = await Notes_1.default.create({
            user: req.user.id,
            title,
            description,
        });
        res.status(201).json({ success: true, note });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error creating note" });
    }
});
// Get Notes
NoteRoutes.get("/", Auth_1.verifyToken, async (req, res) => {
    try {
        const notes = await Notes_1.default.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, notes });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error fetching notes" });
    }
});
// Delete Note
NoteRoutes.delete("/:id", Auth_1.verifyToken, async (req, res) => {
    try {
        await Notes_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Note deleted" });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error deleting note" });
    }
});
exports.default = NoteRoutes;
//# sourceMappingURL=NoteRoutes.js.map