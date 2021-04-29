import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, 'Please enter a full name'],
    },

    last_name: {
      type: String,
      unique: true,
    },

    password: String,

    salt: String,

    projects: Array(Object),
    needs: Array(Object),
  },
  { timestamps: true },
);

export default mongoose.model<IUser & mongoose.Document>('users', User);