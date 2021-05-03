import { ISkill } from "../interfaces/ISkill";
import mongoose from "mongoose";

const Skill = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    content: String,
  },
  { timestamps: true }
);

export default mongoose.model<ISkill & mongoose.Document>("skills", Skill);
