import { API_URL } from "../App";
import { IUser } from "../interfaces";
import { ISignin } from "./api";

const signin = async (user: ISignin) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  let response = await fetch(`${API_URL}/auth/signin`, requestOptions);
  let data = await response.json();
  return data;
};

const signup = async (user: Partial<IUser> & ISignin) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };
  let response = await fetch(`${API_URL}/auth/signup`, requestOptions);
  let data = await response.json();

  return data;
};

export { signin, signup };

const authApi = {
  signup,
  signin,
};

export default authApi;
