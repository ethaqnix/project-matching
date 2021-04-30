import { Router } from "express";
import auth from "./routes/auth";
import projects from "./routes/projects";
import users from "./routes/users";

export default () => {
  const app = Router();
  auth(app);
  users(app);
  projects(app);
  return app;
};
