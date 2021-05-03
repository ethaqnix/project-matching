import { Router } from "express";
import auth from "./routes/auth";
import projects from "./routes/projects";
import users from "./routes/users";
import match from "./routes/match";
import skills from "./routes/skills";

export default () => {
  const app = Router();
  auth(app);
  users(app);
  projects(app);
  skills(app);
  match(app);
  return app;
};
