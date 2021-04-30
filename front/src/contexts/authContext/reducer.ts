import { IUser } from "../../interfaces";
import { AuthAction } from "./actions";

export interface IAuthState {
  loading: boolean;
  connected: boolean;
  passport?: IUser;
}

export const initialAuthState = {
  loading: false,
  connected: true,
  passport: {
    _id: "00000579d44e9311246ea3a4",
    skills: [
      "0000000fd44e9311246ea3a5",
      "00000052d44e9311246ea3a6",
      "00000010d44e9311246ea3a7",
    ],
    projects: ["00000401d44e9311246ea3ad"],
    needs: [
      "00000041d44e9311246ea3a8",
      "00000052d44e9311246ea3a9",
      "0000000ad44e9311246ea3aa",
      "0000000dd44e9311246ea3ab",
      "0000004cd44e9311246ea3ac",
    ],
    lastName: "Smith",
    firstName: "John",
  },
};

export const AuthReducer = (
  initialState: IAuthState,
  action: AuthAction
): IAuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...initialState,
        passport: action.payload,
        loading: true,
        connected: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        connected: true,
        loading: false,
      };
    default:
      return initialState;
  }
};
