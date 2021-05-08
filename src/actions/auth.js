export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const isAuthUser = () => {
  if (localStorage.getItem("user")) {
    return true;
  } else {
    return false;
  }
};

export const login = (user) => {
  return {
    type: LOGIN,
    payload: user,
  };
};

export const logout = () => {
  localStorage.removeItem("user");
  return {
    type: LOGOUT,
  };
};
