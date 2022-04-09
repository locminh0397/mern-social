import { AUTH, LOGOUT } from "../constants/actionTypes";
import * as api from "../../api";

export const googleAuth = (payload) => ({
  type: AUTH,
  data: { result: payload?.profileObj, token: payload?.tokenId },
});

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.Login(formData);
    dispatch({ type: AUTH, data });
    history("/");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.Register(formData);
    dispatch({ type: AUTH, data });
    history("/");
  } catch (error) {
    console.log(error);
  }
};

export const Logout = () => ({ type: LOGOUT });
