import { ISkill } from "./ISkill";
import { IProject } from "./IProject";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  skills: string[] | Partial<ISkill>[];
  projects: string[] | Partial<IProject>[];
  needs: string[] | Partial<ISkill>[];
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
}
