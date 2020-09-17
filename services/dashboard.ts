import { LATEST_USERS, IS_FETCHING_LATEST_USERS } from '../actionTypes/dashboard'

export const GetLatestUsers = (users) => (dispatch) => {
  dispatch({type: LATEST_USERS, payload: users})
}

export const IsFetchingLatestUsers = (isFetching) => (dispatch) => {
  dispatch({type: IS_FETCHING_LATEST_USERS, payload: isFetching})
}