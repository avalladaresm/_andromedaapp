import React, { createContext, useContext, useState } from "react";
import ActivityLogColumns from "../columns/ActivityLogColumns";

const updatedSettings = (settings) => {
  return settings
}

export const ActivityLogsSettingsContext = createContext([])
export const ActivityLogsSettingsUpdateContext = createContext((settings) => updatedSettings(settings))

export function useActivityLogsSettings() {
  return useContext(ActivityLogsSettingsContext)
}

export function useActivityLogsSettingsUpdate() {
  return useContext(ActivityLogsSettingsUpdateContext)
}

export function ActivityLogsSettingsProvider({ children }) {
  ActivityLogColumns.forEach(al => al['checked'] = true)
  const [settings, setSettings] = useState(ActivityLogColumns)

  return (
    <ActivityLogsSettingsContext.Provider value={settings}>
      <ActivityLogsSettingsUpdateContext.Provider value={setSettings}>
        {children}
      </ActivityLogsSettingsUpdateContext.Provider>
    </ActivityLogsSettingsContext.Provider >
  )
}