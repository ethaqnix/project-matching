import { Router, Request, Response } from "express";
import { IUser } from "../../interfaces";
import { projectsCollection, skillsCollection } from "../../models";
import usersCollection from "../../models/user";
import middlewares from "../middlewares";

const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  route.get("/", middlewares.isAuth, async (req: Request, res: Response) => {
    const userList = await usersCollection.find({});

    res.send(userList);
  });

  route.get(
    "/myself",
    middlewares.isAuth,
    async (req: Request, res: Response) => {
      const user = await usersCollection.aggregate([
        {
          $match: {
            firstName: "John",
            lastName: "Smith",
          },
        },
        {
          $lookup: {
            from: "skills",
            let: { skills: "$skills" },
            pipeline: [
              { $match: { $expr: { $in: ["$_id", "$$skills"] } } },
              { $project: { __v: 0, createdAt: 0, updatedAt: 0 } },
            ],
            as: "skills",
          },
        },
        {
          $lookup: {
            from: "projects",
            let: { projects: "$projects" },
            pipeline: [
              {
                $match: {
                  $expr: { $in: ["$_id", { $ifNull: ["$$projects", []] }] },
                },
              },
              { $project: { __v: 0, createdAt: 0, updatedAt: 0, _id: 0 } },
            ],
            as: "projects",
          },
        },
        {
          $lookup: {
            from: "skills",
            let: { needs: "$needs" },
            pipeline: [
              { $match: { $expr: { $in: ["$_id", "$$needs"] } } },
              { $project: { __v: 0, createdAt: 0, updatedAt: 0, _id: 0 } },
            ],
            as: "needs",
          },
        },
      ]);
      res.send(user.length ? user[0] : { error: "User not connected" });
    }
  );

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

  route.patch("/:userId", async (req: Request, res: Response) => {
    const { needs, skills, projects } = req.body;
    const payload: Partial<IUser> = {};
    if (needs) payload.needs = needs;
    if (skills) payload.skills = skills;
    if (needs) payload.projects = projects;

    const update = await usersCollection.updateOne(
      { _id: req.params.userId },
      payload
    );

    const updatedUser = await usersCollection.findOne({
      _id: req.params.userId,
    });

    res.send(updatedUser);
  });

  route.post(
    "/:userId/contact",
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response) => {
      const currentUser = req.currentUser;

      const update = await usersCollection.updateOne(
        { _id: req.params.userId },
        {
          $push: {
            contacts: currentUser._id,
          },
        }
      );

      const update2 = await usersCollection.updateOne(
        { _id: currentUser._id },
        {
          $push: {
            contacts: req.params.userId,
          },
        }
      );
    }
  );
};
