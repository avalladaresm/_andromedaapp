import { combineReducers } from 'redux';
import auth from './auth'
import users from './users'
import dashboard from './dashboard'
import logs from './logs'
import global from './global'

export default combineReducers({
  auth,
  dashboard,
  users,
  logs,
  global
});