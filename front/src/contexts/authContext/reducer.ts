import { IUser } from "../../interfaces";
import { AuthAction } from "./actions";

export interface IAuthState {
  loading: boolean;
  connected: boolean;
  passport?: IUser;
}

export const initialAuthState = {
  loading: true,
  connected: false,
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
        loading: false,
        connected: true,
      };
    case "SET_PASSPORT":
      return {
        ...initialState,
        passport: action.payload,
      };
    case "LOGOUT":
      return {
        ...initialState,
        connected: false,
        loading: false,
      };
    default:
      return initialState;
  }
};
