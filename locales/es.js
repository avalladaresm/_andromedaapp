import dashboard from "../pages/dashboard";

import { dashboard_es } from './dashboard'
import { users_es } from './users'
import { logs_es } from './logs'

export const es = {
  ...dashboard_es,
  ...users_es,
  ...logs_es,
  logout: 'Cerrar sesión'
}