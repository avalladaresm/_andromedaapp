import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React from "react";
import { useQueryClient } from "react-query";
import { AuthCookie } from "../models/AuthCookie";
import { useAuth, useDoLogout } from "../services/auth";

export default function ProfileMenu() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const auth: AuthCookie = useAuth(queryClient)

  return (
    <div className='flex items-center justify-center'>
      <div className='relative inline-block text-left bg-gray-50'>
        <Menu>
          {({ open }) => (
            <div className='bg-white'>
              <span className='rounded-md shadow-sm'>
                <Menu.Button className='bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                  <div className='h-10 w-10 border-orange-600 rounded-full' />
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
                    <p className='text-sm font-medium leading-5 text-gray-900 truncate'>{auth?.uid}</p>
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
                          onClick={() => useDoLogout(queryClient, router, document.cookie)}
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
    </div>

  )
}