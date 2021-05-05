import { API_URL } from "../App";
import { IUser } from "../interfaces";

interface ISignin {
  firstName: string;
  lastName: string;
  password: string;
}

const getUser = async (id: string) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let response = await fetch(`${API_URL}/users/${id}`, requestOptions);
  let data = await response.json();
  return data;
};

const getUsers = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let response = await fetch(`${API_URL}/users/`, requestOptions);
  let data = await response.json();
  return data;
};

export { getUser, getUsers };
