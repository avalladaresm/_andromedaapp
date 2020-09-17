import { dashboardEs } from './dashboard'
import { usersEs } from './users'
import { logsEs } from './logs'

export const es = {
  ...dashboardEs,
  ...usersEs,
  ...logsEs,
  logout: 'Cerrar sesión'
}
