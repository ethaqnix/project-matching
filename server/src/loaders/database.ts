import {
  usersCollection,
  skillsCollection,
  projectsCollection,
} from "../models";
import { data as usersdata } from "../data/users_data.json";
import currentUserData from "../data/current_user.json";
import { list_of_needs } from "../data/list_of_needs.json";
import { Types as MongooseTypes } from "mongoose";

export default async (): Promise<void> => {
  const skills = await skillsCollection.find();
  if (skills.length === 0) {
    await skillsCollection.insertMany(
      list_of_needs.map((need) => ({
        _id: MongooseTypes.ObjectId(need.id),
        content: need.content,
      }))
    );
  }

  const users = await usersCollection.find();
  if (users.length === 0) {
    const {
      projects: currentUserProjects,
      needs,
      id,
      last_name: currentUserLastName,
      first_name: currentUserFirstName,
      skills: currentUserSkills,
    } = currentUserData;

    await usersCollection
      .insertMany([
        {
          _id: MongooseTypes.ObjectId(id),
          lastName: currentUserLastName,
          firstName: currentUserFirstName,
          skills: currentUserSkills.map((skill) =>
            MongooseTypes.ObjectId(skill.id)
          ),
          needs: needs.map((need) => MongooseTypes.ObjectId(need.id)),
          projects: currentUserProjects.map(
            ({ id: projectId, name, description }) => {
              const mongoProjectId = MongooseTypes.ObjectId(projectId);

              projectsCollection.insertMany([
                { _id: mongoProjectId, name, description },
              ]);
              return mongoProjectId;
            }
          ),
        },
        ...usersdata.map(
          ({
            id,
            skills: currentUserSkills = [],
            projects: userProjects = [],
            last_name,
            first_name,
          }) => ({
            _id: MongooseTypes.ObjectId(id),
            firstName: first_name,
            lastName: last_name,
            skills: currentUserSkills?.map((skill) => skill.id) || [],
            projects: userProjects.map(
              ({ id: projectId, name, description }) => {
                const MongoProjectId = MongooseTypes.ObjectId(projectId);
                projectsCollection.insertMany([
                  { _id: MongoProjectId, name, description },
                ]);

                return MongoProjectId;
              }
            ),
          })
        ),
      ])
      .catch((err) => {
        console.log("Error importing users data", err);
      });
  }
  return;
};
