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
  PROFILE_FAILED
} from '../actions/authorization.js'

const initialAuth = {
  user: {},
  registerRequested: false,
  registerFailed: false,
  loginRequested: false,
  loginFailed: false,
  exitRequested: false,
  exitFailed: false,
  profileRequested: false,
  profileFailed: false
}
//Все редьюсеры взаимодействуют с объектом User
export function authReducer(state = initialAuth, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        registerRequested: true,
        registerFailed: false
      }

    case REGISTER_SUCCESS:
      return {
        ...state,
        registerRequested: false,
        registerFailed: false,
        user: action.user
      }

    case REGISTER_FAILED:
      return {
        ...state,
        registerFailed: true
      }

    case LOGIN_REQUEST:
      return {
        ...state,
        loginRequested: true,
        loginFailed: false
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        loginRequested: false,
        loginFailed: false,
        user: action.user
      }

    case LOGIN_FAILED:
      return {
        ...state,
        loginRequested: false,
        loginFailed: true
      }

    case EXIT_REQUEST:
      return {
        ...state,
        exitRequested: false,
        exitFailed: true
      }

    case EXIT_SUCCESS:
      return {
        ...state,
        exitRequested: false,
        exitFailed: true,
        user: {}
      }
    case EXIT_FAILED:
      return {
        ...state,
        exitRequested: false,
        exitFailed: true
      }

    case PROFILE_REQUEST:
      return {
        ...state,
        profileRequested: false,
        profileFailed: true
      }

    case PROFILE_SUCCESS:
      return {
        ...state,
        profileRequested: false,
        profileFailed: true,
        user: action.user
      }
    case PROFILE_FAILED:
      return {
        ...state,
        profileRequested: false,
        profileFailed: true
      }

    default:
      return state
  }
}
