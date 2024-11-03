import * as api from "../api";
import { setCurrentUser } from "./currentUser";
import { fetchAllUsers } from "./users";

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    dispatch(fetchAllUsers());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const googleAuth = (result, navigate) => async (dispatch) => {
  try {
    // Send Google auth data to backend
    const { data } = await api.googleLogin(result);
    
    dispatch({ type: 'AUTH', data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};
