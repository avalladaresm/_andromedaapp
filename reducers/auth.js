import { SignInStatus } from '../models/SignInStatus'
import { DO_SIGN_IN, SIGN_IN_STATUS, IS_SIGNING_IN, GET_SIGNED_IN_USER_FROM_COOKIE, DO_SIGN_OUT, WANTED_PATH } from '../actionTypes/auth'

const initialState = {
  loggedInUser: {},
  signInStatus: SignInStatus.NOT_SIGNED_IN_YET,
  isSigningIn: false,
  wantedPath: ''
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case DO_SIGN_IN:
    case GET_SIGNED_IN_USER_FROM_COOKIE: {
      return {
        ...state,
        loggedInUser: action.payload
      }
    }
    case IS_SIGNING_IN: {
      return {
        ...state,
        isSigningIn: action.payload
      }
    }
    case SIGN_IN_STATUS: {
      return {
        ...state,
        signInStatus: action.payload
      }
    }
    case DO_SIGN_OUT: {
      return {
        ...state,
        signInStatus: action.payload.signInStatus,
        loggedInUser: action.payload.loggedInUser
      }
    }
    case WANTED_PATH: {
      return {
        ...state,
        wantedPath: action.payload
      }
    }
    default:
      return state
  }
}

export default auth
