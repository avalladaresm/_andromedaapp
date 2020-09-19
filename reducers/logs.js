import { CREATE_ERROR_LOG, CREATE_ROUTE_CHANGE_LOG, CREATE_LANGUAGE_CHANGE_LOG, CREATE_UNAUTHORIZED_ACCESS_LOG } from '../actionTypes/logs'

const initialState = {
  logs: [],
  logData: {}
}

const logs = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ERROR_LOG: {
      return {
        ...state,
        logs: [...state.logs, action.payload]
      }
    }
    case CREATE_ROUTE_CHANGE_LOG: {
      return {
        ...state,
        logs: [...state.logs, action.payload]
      }
    }
    case CREATE_LANGUAGE_CHANGE_LOG: {
      return {
        ...state,
        logs: [...state.logs, action.payload]
      }
    }
    case CREATE_UNAUTHORIZED_ACCESS_LOG: {
      return {
        ...state,
        logs: [...state.logs, action.payload]
      }
    }
    default:
      return state
  }
}

export default logs
