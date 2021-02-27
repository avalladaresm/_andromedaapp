import React, { createContext, useContext } from "react";
import ActivityLogColumns from "../columns/ActivityLogColumns";
import AuthLogColumns from '../columns/AuthLogColumns'
import BusinessColumns from '../columns/BusinessColumns'
import EmployeeColumns from '../columns/EmployeeColumns'
import PersonColumns from '../columns/PersonColumns'
import RecentAuthLogRecordsColumns from '../columns/RecentAuthLogRecordsColumns'
import { TablesColumns } from "../models/TablesColumns";

const tableSettings = {
  activityLogColumns: ActivityLogColumns,
  authLogColumns: AuthLogColumns,
  businessColumns: BusinessColumns,
  employeeColumns: EmployeeColumns,
  personColumns: PersonColumns,
  recentAuthLogRecordsColumns: RecentAuthLogRecordsColumns
}

Object.entries(tableSettings).forEach(([, value]) => value.forEach(v => v['checked'] = true))

export const TableSettingsContext = createContext<TablesColumns>(undefined)

export function useTableSettings() {
  return useContext(TableSettingsContext)
}

export function TableSettingsProvider({ children }) {

  return (
    <TableSettingsContext.Provider value={tableSettings}>
      {children}
    </TableSettingsContext.Provider >
  )
}