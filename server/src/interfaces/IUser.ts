export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  skills: string[];
  projects: string[];
  needs?: string[];
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
}
