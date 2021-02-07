import React from "react";
import { NavigationItems } from "./NavigationItems";

export const Sidebar = (props) => {

  return (
    <nav className="fixed top-0 bottom-0 overflow-y-auto flex-row flex-no-wrap overflow-hidden shadow-inner bg-orange-600 items-center justify-between w-56 z-10 py-4 px-6">
      <div className="flex-col items-stretch min-h-full flex-no-wrap px-0 flex flex-wrap w-full mx-auto space-y-2">
        <div className="text-center text-white mr-0 whitespace-no-wrap text-sm font-bold p-2 px-0 rounded-md bg-amber-500">
          andromedaapp
        </div>
        <NavigationItems {...props} />
      </div>
    </nav>
  );
}