import { LogTypes } from './LogTypes';

export interface ILog {
  userName: string;
  date: moment.Moment;
  type: LogTypes;
  description: string;
  data: string;
}

export interface ILogIn {
	username: string,
	password: string
}

export interface IAuthCookie {
	userName: string, 
	roles: Array<string>,
	accessToken: string
}

interface IRoles {
	role: string
}

export interface ILogInSuccess {
	username: string,
	roles: Array<IRoles>
}