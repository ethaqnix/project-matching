import { Dispatch } from "react";
import { ISignin } from "../../api/api";
import { signin, signup } from "../../api/auth";
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

interface IPatchPassportAction {
  type: "PATCH_PASSPORT";
  payload: Partial<IUser>;
}

interface ISetSigninCurrentlyLoadingAction {
  type: "SET_SIGNIN_CURRENTLY_LOADING";
  payload: boolean;
}

interface ILoginErrorAction {
  type: "LOGIN_ERROR";
  payload: string;
}

export type AuthAction =
  | ILoginAction
  | ILogoutAction
  | ISetPassportAction
  | ISetSigninCurrentlyLoadingAction
  | ILoginErrorAction
  | IPatchPassportAction;

export const loginUser = async (
  dispatch: Dispatch<
    ILoginAction | ILoginErrorAction | ISetSigninCurrentlyLoadingAction
  >,
  payload: ISignin
) => {
  dispatch({ type: "SET_SIGNIN_CURRENTLY_LOADING", payload: true });
  try {
    let data = await signin(payload);
    if (data.user) {
      dispatch({ type: "LOGIN", payload: data.user });
      localStorage.setItem("authorization", `Bearer ${data.token}`);
      localStorage.setItem("user", data.user._id);
      return true;
    }

    if (data.error) {
      dispatch({ type: "LOGIN_ERROR", payload: data.error });
    }
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", payload: error });
    console.log(error);
  }
  dispatch({ type: "SET_SIGNIN_CURRENTLY_LOADING", payload: false });
  return false;
};

export const signupUser = async (
  dispatch: Dispatch<
    ILoginAction | ILoginErrorAction | ISetSigninCurrentlyLoadingAction
  >,
  payload: ISignin
) => {
  dispatch({ type: "SET_SIGNIN_CURRENTLY_LOADING", payload: true });
  try {
    let data = await signup(payload);
    if (data.user) {
      dispatch({ type: "LOGIN", payload: data.user });
      localStorage.setItem("authorization", `Bearer ${data.token}`);
      localStorage.setItem("user", data.user._id);
      return true;
    }

    if (data.error) {
      dispatch({ type: "LOGIN_ERROR", payload: data.error });
    }
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", payload: error });
    console.log(error);
  }
  dispatch({ type: "SET_SIGNIN_CURRENTLY_LOADING", payload: false });
  return false;
};

export const setUserPassport = async (
  dispatch: Dispatch<ISetPassportAction>,
  payload: IUser
) => {
  dispatch({ type: "SET_PASSPORT", payload });
};

export const patchUserPassport = async (
  dispatch: Dispatch<IPatchPassportAction>,
  payload: Partial<IUser>
) => {
  dispatch({ type: "PATCH_PASSPORT", payload });
};

export const logout = async (dispatch: Dispatch<ILogoutAction>) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("authorization");
  localStorage.removeItem("user");
};
