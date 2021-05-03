import { Router, Request, Response, NextFunction } from "express";
import { skillsCollection } from "../../models";

const route = Router();

export default (app: Router) => {
  app.use("/skills", route);

  route.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const skills = await skillsCollection.find();
    res.send(skills);
  });
};
