import { format } from "date-fns"
import { AuthLogResult } from "../../models/AuthLog"

export const AuthLogColumns = [
  {
    Header: 'id',
    accessor: 'id'
  },
  {
    Header: 'Username',
    accessor: 'username'
  },
  {
    Header: 'Type',
    accessor: 'type',
  },
  {
    id: 'createdAt',
    Header: 'Date and time',
    accessor: (row: AuthLogResult) => {
      const formattedDate = row?.createdAt && format(new Date(row?.createdAt), 'PPPP pp')
      return formattedDate
    },
  },
  {
    Header: 'IP',
    accessor: 'ip',
  },
  {
    Header: 'Operating System',
    accessor: 'osplatform',
  },
  {
    Header: 'Browser name',
    accessor: 'browsername',
  },
  {
    Header: 'Browser version',
    accessor: 'browserversion',
  }
]