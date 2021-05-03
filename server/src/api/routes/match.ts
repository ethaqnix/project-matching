import { Router, Request, Response, NextFunction } from "express";
import { skillsCollection, usersCollection } from "../../models";

const route = Router();

export default (app: Router) => {
  app.use("/match", route);

  route.get("/:userId", async (req: Request, res: Response) => {
    const { needs } = await usersCollection.findOne(
      { _id: req.params.userId },
      { needs: 1 }
    );

    const sortedUsers = await usersCollection.aggregate([
      {
        $project: {
          skills: {
            $filter: {
              input: "$skills",
              as: "skill",
              cond: { $in: ["$$skill", needs] },
            },
          },
          projects: 1,
          firstName: 1,
          lastName: 1,
        },
      },
      { $match: { skills: { $in: needs } } },
      {
        $set: {
          matchedCount: {
            $size: {
              $setIntersection: ["$skills", needs],
            },
          },
        },
      },

      {
        $sort: {
          matchedCount: -1,
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
            { $project: { __v: 0, createdAt: 0, updatedAt: 0 } },
          ],
          as: "projects",
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
        $project: {
          firstName: 1,
          lastName: 1,
          skills: {
            $map: {
              input: "$skills",
              as: "skill",
              in: "$$skill.content",
            },
          },
          projects: {
            $map: {
              input: "$projects",
              as: "project",
              in: "$$project.name",
            },
          },
        },
      },
    ]);
    res.send(sortedUsers);
  });
};
