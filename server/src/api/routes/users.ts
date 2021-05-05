import { Router, Request, Response } from "express";
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

  route.get("/myself", async (req: Request, res: Response) => {
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

  route.patch("/:userId", async (req: Request, res: Response) => {
    console.log(req.body);

    const payload = {};
    if (req.body.needs) {
      const needsChange = req.body.needs || [];
      const needs = await skillsCollection.find({
        content: { $in: needsChange },
      });
      const needsIds = needs.map((skill) => skill._id);
      payload["needs"] = needsIds;
    }
    if (req.body.skills) {
      const skillsChange = req.body.skills || [];
      const skills = await skillsCollection.find({
        content: { $in: skillsChange },
      });
      const skillsIds = skills.map((skill) => skill._id);

      payload["skills"] = skillsIds;
    }
    console.log(payload);

    const update = await usersCollection.updateOne(
      { _id: req.params.userId },
      payload
    );

    const updatedUser = await usersCollection.findOne({
      _id: req.params.userId,
    });

    res.send(updatedUser);
  });
};
