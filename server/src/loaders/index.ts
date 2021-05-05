import expressLoader from "./express";
import mongooseLoader from "./mongoose";

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  console.log("DB loaded and connected!");

  expressLoader({ app: expressApp });
  console.log("Express loaded");
};
