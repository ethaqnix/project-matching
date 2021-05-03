import { IUser } from "../interfaces/IUser";
import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    firstName: String,
    lastName: String,
    skills: Array(mongoose.Types.ObjectId),
    projects: Array(mongoose.Types.ObjectId),
    needs: Array(mongoose.Types.ObjectId),
  },
  { timestamps: true }
);

export default mongoose.model<IUser & mongoose.Document>("users", User);
