import { Dispatch } from "react";
import { IUser } from "../../interfaces";

interface ILogoutAction {
  type: "LOGOUT";
}

interface ILoginAction {
  type: "LOGIN";
  payload: IUser;
}

interface ISetPassportAction {
  type: "SET_PASSPORT";
  payload: IUser;
}

export type AuthAction = ILoginAction | ILogoutAction | ISetPassportAction;

export const loginUser = async (
  dispatch: Dispatch<ISetPassportAction>,
  payload: IUser
) => {
  dispatch({ type: "SET_PASSPORT", payload });
};

export const setUserPassport = async (
  dispatch: Dispatch<ISetPassportAction>,
  payload: IUser
) => {
  dispatch({ type: "SET_PASSPORT", payload });
};

export const logout = async (dispatch: Dispatch<ILogoutAction>) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
};
