import React, { useEffect, useState } from "react";
import { NavigationItems } from "./NavigationItems";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Content from './Content'
import Header from './Header'
import { useRouter } from "next/router";

export const Sidebar = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [loadingMessage, setLoadingMessage] = useState<string>(undefined)

  const router = useRouter()

  useEffect(() => {
    setLoadingMessage('Redirecting you to your dashboard...')
  }, [])

  return (
    <div>
      <nav className={
        `flex flex-col fixed top-0 bottom-0 overflow-y-auto flex-no-wrap overflow-hidden shadow-inner bg-blueGray-400 items-center justify-between z-10 pt-4 pb-2
        ${collapsed ? 'w-20 px-4' : 'w-56 px-6'
        }`}>
        <div className="flex-col items-stretch flex-no-wrap px-0 flex flex-wrap w-full mx-auto space-y-2">
          <div>
            <div className="w-full text-center text-white mr-0 whitespace-no-wrap text-sm font-bold p-2 px-0 rounded-md bg-lightBlue-300">
              {collapsed ? 'app' : 'andromedaapp'}
            </div>
            <NavigationItems {...props} collapsed={collapsed} />
          </div>
        </div>
        <div className='w-full py-3 rounded-md bg-blueGray-700 hover:cursor-pointer shadow-inner' onClick={() => setCollapsed(!collapsed)}>
          <div className='flex justify-center'>
            {collapsed ? <FaChevronRight color='white' /> : <FaChevronLeft color='white' />}
          </div>
        </div>
      </nav>
      <div>
        <Header />
        <Content {...props} collapsed={collapsed}>
          {router.pathname === '/' && loadingMessage}
          {props.children}
        </Content>
      </div>
    </div>
  );
}