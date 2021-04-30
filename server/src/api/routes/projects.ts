import { Router, Request, Response, NextFunction } from "express";
import { projectsCollection } from "../../models";

const route = Router();

export default (app: Router) => {
  app.use("/projects", route);

  route.get("/", async (req: Request, res: Response, next: NextFunction) => {
    const projectList = await projectsCollection.find({});
    res.send(projectList);
  });

  route.get(
    "/:id",
    async (req: Request, res: Response, next: NextFunction) => {}
  );
};
