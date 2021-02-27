import ActivityLogColumns from "../columns/ActivityLogColumns";
import AuthLogColumns from "../columns/AuthLogColumns";
import BusinessColumns from "../columns/BusinessColumns";
import EmployeeColumns from "../columns/EmployeeColumns";
import PersonColumns from "../columns/PersonColumns";
import RecentAuthLogRecordsColumns from "../columns/RecentAuthLogRecordsColumns";

export interface TablesColumns {
  activityLogColumns: typeof ActivityLogColumns,
  authLogColumns: typeof AuthLogColumns,
  businessColumns: typeof BusinessColumns,
  employeeColumns: typeof EmployeeColumns,
  personColumns: typeof PersonColumns,
  recentAuthLogRecordsColumns: typeof RecentAuthLogRecordsColumns
}