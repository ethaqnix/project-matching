export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  skills?: string[];
  projects?: string[];
  needs?: string[];
  contacts?: string[];
  password: string;
}

export type IUserInputDTO = Partial<IUser> & {};
