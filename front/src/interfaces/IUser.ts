import { ISkill } from "./ISkill";
import { IProject } from "./IProject";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  skills: string[];
  projects: string[];
  needs: string[];
  contacts: string[];
}

export interface IFullUser {
  _id: string;
  firstName: string;
  lastName: string;
  skills: ISkill[];
  projects: IProject[];
  needs: ISkill[];
  contacts: string[];
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
}
