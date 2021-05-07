import { API_URL } from "../App";
import { IUser } from "../interfaces";

const getUser = async (id: string) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("authorization") || "",
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
      Authorization: localStorage.getItem("authorization") || "",
    },
  };

  let response = await fetch(`${API_URL}/users/`, requestOptions);
  let data = await response.json();
  return data;
};

const contactUser = async (userToContactId: string) => {
  const response = await fetch(
    `http://localhost:8080/users/${userToContactId}/contact`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("authorization") || "",
      },
    }
  );
  const data: IUser = await response.json();
  return data;
};

const updateUser = async (id: string, update: Partial<IUser>) => {
  const response = await fetch(`http://localhost:8080/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("authorization") || "",
    },
    body: JSON.stringify(update),
  });
  const data: IUser = await response.json();
  return data;
};

export { updateUser, getUser, getUsers, contactUser };

const usersApi = {
  get: {
    user: getUser,
    users: getUsers,
  },
  update: {
    user: updateUser,
  },
  contact: {
    user: contactUser,
  },
};

export default usersApi;
