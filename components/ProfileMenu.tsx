import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";
import { CurrentUserAuthData } from "../models/CurrentUserAuthData";
import { useAuth, useDoLogout } from "../services/auth";
import IPData from 'ipdata';
import { getPlatformData } from "../utils/utils";
const ipdata = new IPData(`${process.env.IPDATA_APIKEY}`);

export default function ProfileMenu() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const auth: CurrentUserAuthData = useAuth(queryClient)

  const onLogout = async () => {
    const ip = await ipdata.lookup()
    let platform = getPlatformData()
    platform = { ...platform, ip: ip.ip }
    useDoLogout(queryClient, router, document.cookie, auth?.u, platform)
  }

  return (
    <div className='relative inline-block'>
      <Menu>
        {({ open }) => (
          <div>
            <span className='rounded-md shadow-sm'>
              <Menu.Button style={{ outline: 'none' }} className='bg-yellow-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                <div style={{ outline: 'none' }} className='h-10 w-10 border border-white rounded-full' />
              </Menu.Button>
            </span>

            <Transition
              show={open}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items
                className='absolute right-0 w-56 mt-2 origin-top-right bg-gray-50 border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none'
              >
                <div className='px-4 py-3'>
                  <p className='text-sm leading-5'>Signed in as</p>
                  <p className='text-sm font-medium leading-5 text-gray-900 truncate'>{auth?.u}</p>
                </div>

                <div className='py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href=''
                        className={`${active
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700'
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                        Account settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item as='span' disabled className='flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50' >
                    New feature (soon)
                  </Menu.Item>
                </div>
                <div className='py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => onLogout()}
                        className={`${active
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700'
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                        Sign out
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </div>
        )}
      </Menu>
    </div>
  )
}