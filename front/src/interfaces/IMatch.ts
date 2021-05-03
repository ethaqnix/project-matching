import { IProject } from "./IProject";
import { ISkill } from "./ISkill";

export interface IMatch {
  _id: string;
  firstName: string;
  lastName: string;
  skills: string[];
  matchedCount: number;
  projects: string[];
}
