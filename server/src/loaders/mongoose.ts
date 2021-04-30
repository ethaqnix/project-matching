import mongoose from "mongoose";
import { Db } from "mongodb";
import config from "../config";
import { usersCollection } from "../models";
import importDatabase from "./database";

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  importDatabase();

  return connection.connection.db;
};
