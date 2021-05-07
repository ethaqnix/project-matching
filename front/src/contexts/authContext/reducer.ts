import { IUser } from "../../interfaces";
import { AuthAction } from "./actions";

export interface IAuthState {
  loading: boolean;
  connected: boolean;
  errorMessage?: string;
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
    case "PATCH_PASSPORT":
      if (initialState.passport)
        return {
          ...initialState,
          passport: {
            ...initialState.passport,
            ...action.payload,
          },
        };
      return initialState;
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
