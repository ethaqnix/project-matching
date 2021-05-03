import { IProject } from "../interfaces/IProject";
import mongoose from "mongoose";

const Project = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    name: String,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.model<IProject & mongoose.Document>(
  "projects",
  Project
);
