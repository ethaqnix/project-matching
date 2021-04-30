import { Dispatch } from "react";
import { IUser } from "../../interfaces";

interface ILogoutAction {
  type: "LOGOUT";
}

interface ILoginAction {
  type: "LOGIN";
  payload: IUser;
}

export type AuthAction = ILoginAction | ILogoutAction;

export const loginUser = async (
  dispatch: Dispatch<ILoginAction>,
  payload: IUser
) => {
  dispatch({ type: "LOGIN", payload });
};

export const logout = async (dispatch: Dispatch<ILogoutAction>) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
};
