import { formatRelative } from "date-fns"
import { AuthLogResult } from "../models/AuthLog"

const RecentAuthLogRecordsColumns = [
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
      const formattedDate = row?.createdAt && formatRelative(new Date(row?.createdAt), new Date())
      return formattedDate
    },
  }
]

export default RecentAuthLogRecordsColumns