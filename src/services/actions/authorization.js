import { setCookie, deleteCookie } from "../../utils/utils";
import { tokenlifeTime } from "../../utils/consts";

import { getUser, register, logout, login, updateUser } from "../api.js";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const EXIT_REQUEST = "EXIT_REQUEST";
export const EXIT_SUCCESS = "EXIT_SUCCESS";
export const EXIT_FAILED = "EXIT_FAILED";

export const PROFILE_REQUEST = "PROFILE_REQUEST";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_FAILED = "PROFILE_FAILED";

export const SAVE_PROFILE_REQUEST = "SAVE_PROFILE_REQUEST";
export const SAVE_PROFILE_SUCCESS = "SAVE_PROFILE_SUCCESS";
export const SAVE_PROFILE_FAILED = "SAVE_PROFILE_FAILED";

export const AUTH_CHECKED = "AUTH_CHECKED";

export const profileRequest = (accessTokenValue) => {
  return async (dispatch) => {
    dispatch({
      type: PROFILE_REQUEST,
    });

    await getUser(accessTokenValue)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: PROFILE_SUCCESS,
            user: res.user,
          });
          dispatch({ type: AUTH_CHECKED });
        } else {
          dispatch({ type: AUTH_CHECKED });
          dispatch({
            type: PROFILE_FAILED,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: AUTH_CHECKED });
        dispatch({
          type: PROFILE_FAILED,
        });
      });
  };
};

export const updateRequest = (accessTokenValue, email, name, password) => {
  return async (dispatch) => {
    dispatch({
      type: SAVE_PROFILE_REQUEST,
    });

    await updateUser(accessTokenValue, email, name, password)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SAVE_PROFILE_SUCCESS,
            user: res.user,
          });
        } else {
          dispatch({
            type: SAVE_PROFILE_FAILED,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: SAVE_PROFILE_FAILED,
        });
        console.log(error);
      });
  };
};

export const authorization = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });

    login(email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            user: res.user,
          });
          setCookie(
            "accessToken",
            res.accessToken.split("Bearer ")[1],
            tokenlifeTime
          );
          localStorage.setItem("refreshToken", res.refreshToken);
        } else {
          dispatch({
            type: LOGIN_FAILED,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_FAILED,
        });
        alert(error);
      });
  };
};

export const registerRequest = (name, email, password) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });

    register(name, email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            user: res.user,
          });
          setCookie(
            "accessToken",
            res.accessToken.split("Bearer ")[1],
            tokenlifeTime
          );
          localStorage.setItem("refreshToken", res.refreshToken);
        } else {
          dispatch({
            type: REGISTER_FAILED,
          });
        }
      })
      .catch((error) => {
        dispatch({ type: REGISTER_FAILED, error: error });
        alert(error);
      });
  };
};

export const exitRequest = (refreshTokenValue) => {
  return async (dispatch) => {
    await dispatch({
      type: EXIT_REQUEST,
    });
    await logout(refreshTokenValue)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: EXIT_SUCCESS,
            user: {},
          });
          deleteCookie("accessToken");
          localStorage.removeItem("refreshToken");
        } else {
          dispatch({
            type: EXIT_FAILED,
          });
        }
      })
      .catch((error) => {
        console.log("error");
        dispatch({
          type: EXIT_FAILED,
        });
        alert(error);
      });
  };
};
