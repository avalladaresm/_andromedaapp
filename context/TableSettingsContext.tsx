import React, { createContext, useContext, useState } from "react";
import { useQueryClient } from "react-query";
import ActivityLogColumns from "../columns/ActivityLogColumns";
import AuthLogColumns from '../columns/AuthLogColumns'
import BusinessColumns from '../columns/BusinessColumns'
import EmployeeColumns from '../columns/EmployeeColumns'
import PersonColumns from '../columns/PersonColumns'
import RecentAuthLogRecordsColumns from '../columns/RecentAuthLogRecordsColumns'
import { TablesColumns } from "../models/TablesColumns";
import { useQueryTableSettings } from "../services/appsettings";

const tableSettings: TablesColumns = {
  activityLogColumns: ActivityLogColumns,
  authLogColumns: AuthLogColumns,
  businessColumns: BusinessColumns,
  employeeColumns: EmployeeColumns,
  personColumns: PersonColumns,
  recentAuthLogRecordsColumns: RecentAuthLogRecordsColumns
}

Object.entries(tableSettings).forEach(([, value]) => value.forEach(v => v['checked'] = true))

export const TableSettingsContext = createContext<TablesColumns>(undefined)
export const TableSettingsUpdateContext = createContext(undefined)

export function useTableSettings() {
  return useContext(TableSettingsContext)
}

export function useTableSettingsUpdate() {
  return useContext(TableSettingsUpdateContext)
}

export function TableSettingsProvider({ children }) {
  const queryClient = useQueryClient()
  const queryTableSettings: TablesColumns = useQueryTableSettings(queryClient)
  const [settings, setSettings] = useState<TablesColumns>(queryTableSettings ?? tableSettings)

  return (
    <TableSettingsContext.Provider value={settings}>
      <TableSettingsUpdateContext.Provider value={setSettings}>
        {children}
      </TableSettingsUpdateContext.Provider>
    </TableSettingsContext.Provider >
  )
}