import { IS_FETCHING_LATEST_USERS } from '../actionTypes/dashboard'
import axios from 'axios'

export const GetLatestUsers = (users) => {
  console.log('users', users)
}

export const GetAllUserss = () => {
  return axios.get('http://localhost:8080/docs/users')
}

export const IsFetchingLatestUsers = (isFetching) => (dispatch) => {
  dispatch({ type: IS_FETCHING_LATEST_USERS, payload: isFetching })
}
