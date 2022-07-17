import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  EXIT_REQUEST,
  EXIT_SUCCESS,
  EXIT_FAILED,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILED,
  AUTH_CHECKED,
  SAVE_PROFILE_REQUEST,
  SAVE_PROFILE_SUCCESS,
  SAVE_PROFILE_FAILED,
  TAuthUserActions,
} from "../actions/authorization";
import { TUser } from "../types/data";

type TinitialAuthState = {
  registerRequested: boolean;
  registerFailed: boolean;

  loginRequested: boolean;
  loginFailed: boolean;

  exitRequested: boolean;
  exitFailed: boolean;

  profileRequested: boolean;
  profileFailed: boolean;

  saveProfileRequested: boolean;
  saveProfileFailed: boolean;

  isAuthChecked: boolean;

  user?: TUser;
};

const initialAuth: TinitialAuthState = {
  registerRequested: false,
  registerFailed: false,
  loginRequested: false,
  loginFailed: false,
  exitRequested: false,
  exitFailed: false,
  profileRequested: false,
  profileFailed: false,
  saveProfileRequested: false,
  saveProfileFailed: false,

  isAuthChecked: false,
};
//Все редьюсеры взаимодействуют с объектом User
export function authReducer(state = initialAuth, action: TAuthUserActions) {
  switch (action.type) {
    case AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: true,
      };

    case REGISTER_REQUEST:
      return {
        ...state,
        registerRequested: true,
        registerFailed: false,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        registerRequested: false,
        registerFailed: false,
        user: action.user,
      };

    case REGISTER_FAILED:
      return {
        ...initialAuth,
        registerFailed: true,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        loginRequested: true,
        loginFailed: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loginRequested: false,
        loginFailed: false,
        user: action.user,
      };

    case LOGIN_FAILED:
      return {
        ...initialAuth,
        loginRequested: false,
        loginFailed: true,
      };

    case EXIT_REQUEST:
      return {
        ...state,
        exitRequested: true,
        exitFailed: true,
      };

    case EXIT_SUCCESS:
      return {
        ...initialAuth,
        exitRequested: false,
        exitFailed: false,
      };
    case EXIT_FAILED:
      return {
        ...state,
        exitRequested: false,
        exitFailed: true,
      };

    case PROFILE_REQUEST:
      return {
        ...state,
        profileRequested: false,
        profileFailed: true,
      };

    case PROFILE_SUCCESS:
      return {
        ...state,
        profileRequested: false,
        profileFailed: true,
        user: action.user,
      };
    case PROFILE_FAILED:
      return {
        ...state,
        profileRequested: false,
        profileFailed: true,
      };

    case SAVE_PROFILE_REQUEST:
      return {
        ...state,
        saveProfileRequested: true,
        saveProfileFailed: false,
      };

    case SAVE_PROFILE_SUCCESS:
      return {
        ...state,
        saveProfileRequested: false,
        user: action.user,
      };

    case SAVE_PROFILE_FAILED:
      return {
        ...state,
        saveProfileRequested: false,
        saveProfileFailed: true,
      };

    default:
      return state;
  }
}
