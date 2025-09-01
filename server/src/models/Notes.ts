import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const NoteModel = mongoose.model("note", noteSchema);
export default NoteModel;
