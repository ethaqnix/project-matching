import { Router, Request, Response } from "express";
import { projectsCollection } from "../../models";
import usersCollection from "../../models/user";

const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  route.get("/", async (req: Request, res: Response) => {
    const userList = await usersCollection.find({});
    res.send(userList);
  });

  route.get("/:userId", async (req: Request, res: Response) => {
    const userList = await usersCollection.findById(req.params.userId);
    res.send(userList);
  });

  route.get("/:userId/:projectId", async (req: Request, res: Response) => {
    const project = await projectsCollection.find({
      _id: req.params.projectId,
    });
    res.send(project);
  });
};
