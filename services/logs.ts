import axios from 'axios';
import { CREATE_ERROR_LOG, CREATE_ROUTE_CHANGE_LOG, GET_LOGS, CREATE_LOGIN_LOG, CREATE_LOGOUT_LOG, CREATE_LANGUAGE_CHANGE_LOG, CREATE_UNAUTHORIZED_ACCESS_LOG } from '../actionTypes/logs'
import moment from 'moment'
import { LogTypes } from '../models/LogTypes'
import { message } from 'antd';

export const GetLogs = () => async ( dispatch ) => {
  const res = await axios.get(`http://localhost:8080/docs/logs`);
  dispatch({ type: GET_LOGS, payload: res.data });
}

export const CreateRouteChangeLog = (logData) => (dispatch) => {
  axios.post('http://localhost:8080/docs/logs', { data: logData })
  .then((res) => {
    if (res.status === 200){
      dispatch({type: CREATE_ROUTE_CHANGE_LOG, payload: logData})
      dispatch(GetLogs())
    }
  })
  .catch((e) => {
    dispatch(CreateErrorLog({
      userName: logData.userName, 
      date: moment(), 
      type:`${LogTypes.ERROR}`, 
      description:'Error creating route change log.', 
      data: JSON.stringify(logData)
    }))
    throw e.data
  });
}

export const CreateLoginLog = (logData) => (dispatch) => {
  axios.post('http://localhost:8080/docs/logs', { data: logData })
  .then((res) => {
    if (res.status === 200){
      console.log('creating logout log2')
      dispatch({type: CREATE_LOGIN_LOG, payload: logData})
      dispatch(GetLogs())
    }
  })
  .catch((e) => {
    console.log(e)
    throw e.data
  });
}

export const CreateLogoutLog = (logData) => (dispatch) => {
  axios.post('http://localhost:8080/docs/logs', { data: logData })
  .then((res) => {
    if (res.status === 200){
      console.log('dispatching', res)
      dispatch({type: CREATE_LOGOUT_LOG, payload: logData})
      dispatch(GetLogs())
    }
  })
  .catch((e) => {
    console.log(e)
    throw e.data
  });
}

export const CreateErrorLog = (logData) => (dispatch) => {
  axios.post('http://localhost:8080/docs/logs', { data: logData })
  .then((res) => {
    if (res.status === 200){
      dispatch({type: CREATE_ERROR_LOG, payload: logData})
      dispatch(GetLogs())
    }
  })
  .catch((e) => {
    message.error('Error creating error log!')
    console.log(e)
    throw e.data
  });
}

export const CreateLanguageChangeLog = (logData) => (dispatch) => {
  axios.post('http://localhost:8080/docs/logs', { data: logData })
  .then((res) => {
    if (res.status === 200){
      dispatch({type: CREATE_LANGUAGE_CHANGE_LOG, payload: logData})
      dispatch(GetLogs())
    }
  })
  .catch((e) => {
    message.error('Error creating language change log!')
    console.log(e)
    throw e.data
  });
}

export const CreateUnauthorizedAccessLog = (logData) => (dispatch) => {
  axios.post('http://localhost:8080/docs/logs', { data: logData })
  .then((res) => {
    if (res.status === 200){
      dispatch({type: CREATE_UNAUTHORIZED_ACCESS_LOG, payload: logData})
      dispatch(GetLogs())
    }
  })
  .catch((e) => {
    message.error('Error creating unauthorized access log!')
    console.log(e)
    throw e.data
  });
}
