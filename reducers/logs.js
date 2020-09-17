import { GET_LOGS, CREATE_ERROR_LOG, CREATE_ROUTE_CHANGE_LOG, CREATE_LANGUAGE_CHANGE_LOG, CREATE_UNAUTHORIZED_ACCESS_LOG } from '../actionTypes/logs'
import _ from 'lodash'

const initialState = {
  logs: [],
  logData: {}
}

const logs = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGS: {
      const ordered = _.orderBy(action.payload, 'date', 'desc')
      return {
        ...state,
        logs: ordered
      }
    }
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
