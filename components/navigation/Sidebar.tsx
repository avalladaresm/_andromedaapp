import React, { useEffect, useState } from "react";
import { NavigationItems } from "./NavigationItems";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Content from './Content'
import Header from './Header'
import { isMobile } from "../../utils/utils";
import { FloatingSettings } from "../FloatingSettings";
import { SettingsDrawer } from "../SettingsDrawer";
import { TableSettingsProvider } from "../../context/TableSettingsContext";
import { useRouter } from "next/router";

export const Sidebar = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(isMobile())
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [_isMobile, _setIsMobile] = useState<boolean>(isMobile())
  const router = useRouter()

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth >= 640 ? _setIsMobile(false) : _setIsMobile(true)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const allowedPagesWithSettingsDrawer = [
    '/employees',
    '/accounts/persons',
    '/accounts/businesses',
    '/loginhistory',
    '/activitylogs'
  ]

  return (
    <div>
      <div>
        <nav className={
          `flex flex-col fixed top-0 bottom-0 overflow-y-auto flex-no-wrap overflow-hidden shadow-inner bg-blueGray-400 items-center justify-between z-10 pt-4 pb-2
          ${collapsed ? 'w-56 px-6 sm:w-20 sm:px-4' : 'w-56 px-6'}
          ${collapsed && _isMobile && 'hidden'}`
          }>
          <div className="flex-col items-stretch flex-no-wrap px-0 flex flex-wrap w-full mx-auto space-y-2">
            <div className='space-y-3'>
              <div className="w-full text-center text-white mr-0 whitespace-no-wrap text-sm font-bold p-2 px-0 rounded-sm bg-lightBlue-300">
                {collapsed ? 'app' : 'andromedaapp'}
              </div>
              <NavigationItems {...props} collapsed={collapsed} isMobile={_isMobile} />
            </div>
          </div>
          <div className='w-full py-3 rounded-md bg-blueGray-700 hover:cursor-pointer shadow-inner' onClick={() => setCollapsed(!collapsed)}>
            <div className='flex justify-center'>
              {collapsed && !_isMobile ? <FaChevronRight color='white' /> : <FaChevronLeft color='white' />}
            </div>
          </div>
        </nav>
      </div>
      <div>
        <Header collapsed={collapsed} isMobile={_isMobile} onClick={() => setCollapsed(!collapsed)} />
        <TableSettingsProvider>
          <Content {...props} collapsed={collapsed} isOpen={isOpen}>
            {props.children}
          </Content>
          {allowedPagesWithSettingsDrawer.includes(router.pathname) &&
            <FloatingSettings onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
          }
          {isOpen && <SettingsDrawer isOpen={isOpen} />}
        </TableSettingsProvider>
      </div>
    </div>
  );
}