import { IUser } from "../interfaces/IUser";
import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    skills: Array(String),
    projects: Array(String),
    needs: Array(String),
  },
  { timestamps: true }
);

export default mongoose.model<IUser & mongoose.Document>("users", User);
