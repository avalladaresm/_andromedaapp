import axios from 'axios';
import Cookies from 'js-cookie'
import { DO_SIGN_IN, SIGN_IN_STATUS, IS_SIGNING_IN, GET_SIGNED_IN_USER_FROM_COOKIE, DO_SIGN_OUT, WANTED_PATH } from '../actionTypes/auth'
import { CREATE_LOGIN_LOG, CREATE_LOGOUT_LOG } from '../actionTypes/logs'
import { SignInStatus } from '../models/SignInStatus'
import { LogTypes } from '../models/LogTypes'
import { CreateLoginLog, CreateLogoutLog } from './logs';
import moment from 'moment'

export const DoSignIn = (params) => ( dispatch ) => {
	dispatch({ type: IS_SIGNING_IN, payload: true });
  axios.post(`http://localhost:8080/docs/auth/signin`, {
		username: params.username, password: params.password,
	}).then((res) => {
		console.log('res', res)
		Cookies.set('currentUser', JSON.stringify(res.data), { expires: 7 })
		dispatch({ type: DO_SIGN_IN, payload: res.data });
		dispatch({ type: SIGN_IN_STATUS, payload: SignInStatus.SIGN_IN_SUCCESS });
		dispatch({ type: IS_SIGNING_IN, payload: false });
		dispatch(CreateLoginLog({
			userName: params.username, 
			date: moment(), 
			type:	LogTypes.LOGIN, 
			description: `${SignInStatus.SIGN_IN_SUCCESS}: ${params.username} signed in successfully.`, 
			data: JSON.stringify(`${SignInStatus.SIGN_IN_SUCCESS}`)
		}))
	}).catch((e) => {
		dispatch({ type: SIGN_IN_STATUS, payload: SignInStatus.SIGN_IN_ERROR });
		dispatch(CreateLoginLog({
			userName: params.username, 
			date: moment(), 
			type:	LogTypes.LOGIN, 
			description: `${SignInStatus.SIGN_IN_ERROR}: ${params.username} had an error logging in.`, 
			data: JSON.stringify({error: e.data})
		}))
		dispatch({ type: IS_SIGNING_IN, payload: false });
	});
}

export const DoSignOut = (userName) => ( dispatch ) => {
	Cookies.remove('currentUser')
	dispatch({ type: DO_SIGN_OUT, payload: { signInStatus: SignInStatus.NOT_SIGNED_IN_YET, loggedInUser: {}} });
	dispatch(CreateLogoutLog({
		userName: userName, 
		date: moment(), 
		type:	LogTypes.LOGOUT, 
		description: `${userName} logged out.`, 
		data: JSON.stringify(`${SignInStatus.SIGN_OUT_SUCCESS}`)
	}))
}

export const GetSignedInUserFromCookie = (data) => ( dispatch ) => {
	dispatch({ type: GET_SIGNED_IN_USER_FROM_COOKIE, payload: JSON.parse(data) });
	dispatch({ type: SIGN_IN_STATUS, payload: SignInStatus.SIGN_IN_SUCCESS_BY_COOKIE });
}

export const GetWantedPath = (path) => ( dispatch ) => {
	dispatch({ type: WANTED_PATH, payload: path });
}
