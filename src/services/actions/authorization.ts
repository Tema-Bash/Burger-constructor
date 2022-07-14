import { setCookie, deleteCookie } from "../../utils/utils";
import { tokenlifeTime } from "../../utils/consts";
import { getUser, register, logout, login, updateUser } from "../api";
import { TUser } from "../types/data";
import { AppDispatch, AppThunk } from "../types";

export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";

export const REGISTER_REQUEST: "REGISTER_REQUEST" = "REGISTER_REQUEST";
export const REGISTER_SUCCESS: "REGISTER_SUCCESS" = "REGISTER_SUCCESS";
export const REGISTER_FAILED: "REGISTER_FAILED" = "REGISTER_FAILED";

export const EXIT_REQUEST: "EXIT_REQUEST" = "EXIT_REQUEST";
export const EXIT_SUCCESS: "EXIT_SUCCESS" = "EXIT_SUCCESS";
export const EXIT_FAILED: "EXIT_FAILED" = "EXIT_FAILED";

export const PROFILE_REQUEST: "PROFILE_REQUEST" = "PROFILE_REQUEST";
export const PROFILE_SUCCESS: "PROFILE_SUCCESS" = "PROFILE_SUCCESS";
export const PROFILE_FAILED: "PROFILE_FAILED" = "PROFILE_FAILED";

export const SAVE_PROFILE_REQUEST: "SAVE_PROFILE_REQUEST" =
  "SAVE_PROFILE_REQUEST";
export const SAVE_PROFILE_SUCCESS: "SAVE_PROFILE_SUCCESS" =
  "SAVE_PROFILE_SUCCESS";
export const SAVE_PROFILE_FAILED: "SAVE_PROFILE_FAILED" = "SAVE_PROFILE_FAILED";

export const AUTH_CHECKED: "AUTH_CHECKED" = "AUTH_CHECKED";

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
  readonly user: TUser;
}

export interface ILoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}

export interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
  readonly user: TUser;
}

export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FAILED;
}

export interface IExitRequestAction {
  readonly type: typeof EXIT_REQUEST;
}

export interface IExitSuccessAction {
  readonly type: typeof EXIT_SUCCESS;
  readonly user: TUser;
}

export interface IExitFailedAction {
  readonly type: typeof EXIT_FAILED;
}

export interface IProfileRequestAction {
  readonly type: typeof PROFILE_REQUEST;
}

export interface IProfileSuccessAction {
  readonly type: typeof PROFILE_SUCCESS;
  readonly user: TUser;
}

export interface IProfileFailedAction {
  readonly type: typeof PROFILE_FAILED;
}

export interface ISaveProfileRequestAction {
  readonly type: typeof SAVE_PROFILE_REQUEST;
}

export interface ISaveProfileSuccessAction {
  readonly type: typeof SAVE_PROFILE_SUCCESS;
  readonly user: TUser;
}

export interface ISaveProfileFailedAction {
  readonly type: typeof SAVE_PROFILE_FAILED;
}

export interface IAuthChechedAction {
  readonly type: typeof AUTH_CHECKED;
}

export type TAuthUserActions =
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailedAction
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailedAction
  | IExitRequestAction
  | IExitSuccessAction
  | IExitFailedAction
  | IProfileRequestAction
  | IProfileSuccessAction
  | IProfileFailedAction
  | ISaveProfileRequestAction
  | ISaveProfileSuccessAction
  | ISaveProfileFailedAction
  | IAuthChechedAction;

export const loginRequest = (): ILoginRequestAction => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user: TUser): ILoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  user,
});

export const loginFailed = (): ILoginFailedAction => ({
  type: LOGIN_FAILED,
});

export const registerUserRequest = (): IRegisterRequestAction => ({
  type: REGISTER_REQUEST,
});

export const registerUserSuccess = (user: TUser): IRegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  user,
});

export const registerUserFailed = (): IRegisterFailedAction => ({
  type: REGISTER_FAILED,
});

export const exitUserRequest = (): IExitRequestAction => ({
  type: EXIT_REQUEST,
});

export const exitUserSuccess = (user: TUser): IExitSuccessAction => ({
  type: EXIT_SUCCESS,
  user,
});

export const exitUserFailed = (): IExitFailedAction => ({
  type: EXIT_FAILED,
});

export const profileUserRequest = (): IProfileRequestAction => ({
  type: PROFILE_REQUEST,
});

export const profileUserSuccess = (user: TUser): IProfileSuccessAction => ({
  type: PROFILE_SUCCESS,
  user,
});

export const profileUserFailed = (): IProfileFailedAction => ({
  type: PROFILE_FAILED,
});

export const saveProfileRequest = (): ISaveProfileRequestAction => ({
  type: SAVE_PROFILE_REQUEST,
});

export const saveProfileSuccess = (user: TUser): ISaveProfileSuccessAction => ({
  type: SAVE_PROFILE_SUCCESS,
  user,
});

export const saveProfileFailed = (): ISaveProfileFailedAction => ({
  type: SAVE_PROFILE_FAILED,
});

export const authChecked = (): IAuthChechedAction => ({
  type: AUTH_CHECKED,
});

export const profileRequest: AppThunk = (accessTokenValue: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(profileUserRequest());

    await getUser(accessTokenValue)
      .then((res) => {
        if (res && res.success) {
          dispatch(saveProfileSuccess(res.user));
        } else {
          dispatch(saveProfileFailed());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(saveProfileFailed());
      })
      .finally(() => {
        dispatch(authChecked());
      });
  };
};

export const updateRequest: AppThunk = (
  accessTokenValue: string,
  email: string,
  name: string,
  password: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(saveProfileRequest());

    await updateUser(accessTokenValue, email, name, password)
      .then((res) => {
        if (res && res.success) {
          dispatch(saveProfileSuccess(res.user));
        } else {
          dispatch(saveProfileFailed());
        }
      })
      .catch((error) => {
        dispatch(saveProfileFailed());
        console.log(error);
      });
  };
};

export const authorization: AppThunk = (email: string, password: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(loginRequest());

    login(email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch(loginSuccess(res.user));
          setCookie(
            "accessToken",
            res.accessToken.split("Bearer ")[1],
            tokenlifeTime
          );
          localStorage.setItem("refreshToken", res.refreshToken);
        } else {
          dispatch(loginFailed());
        }
      })
      .catch((error) => {
        dispatch(loginFailed());
        console.log(error);
      });
  };
};

export const registerRequest: AppThunk = (
  name: string,
  email: string,
  password: string
) => {
  return (dispatch: AppDispatch) => {
    dispatch(registerUserRequest());
    register(name, email, password)
      .then((res) => {
        if (res && res.success) {
          dispatch(registerUserSuccess(res.user));
          setCookie(
            "accessToken",
            res.accessToken.split("Bearer ")[1],
            tokenlifeTime
          );
          localStorage.setItem("refreshToken", res.refreshToken);
        } else {
          dispatch(registerUserFailed());
        }
      })
      .catch((error) => {
        dispatch(registerUserFailed());
        console.log(error);
      });
  };
};

export const exitRequest: AppThunk = (refreshTokenValue: string) => {
  return async (dispatch: AppDispatch) => {
    await dispatch(exitUserRequest());
    await logout(refreshTokenValue)
      .then((res) => {
        if (res && res.success) {
          dispatch(exitUserSuccess({ name: "", email: "", password: "" }));
          deleteCookie("accessToken");
          deleteCookie("accessToken");
          localStorage.removeItem("refreshToken");
        } else {
          console.log(`exit with error`);
          dispatch(exitUserFailed());
        }
      })
      .catch((error) => {
        console.log("exit with error");
        dispatch(exitUserFailed());
      });
  };
};
