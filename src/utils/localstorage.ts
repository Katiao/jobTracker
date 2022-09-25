import { MODEL__user } from "../types";

// When user navigates away from the page, user details are lost
//Therefore save to local storage

export const addUserToLocalStorage = (user: MODEL__user | null) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

//check if there is a user in local storage first, otherwise return null
export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  return result ? JSON.parse(result) : null;
};
