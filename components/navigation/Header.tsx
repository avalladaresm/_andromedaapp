import React from "react"
import { useQueryClient } from "react-query"
import { CurrentUserAuthData } from "../../models/CurrentUserAuthData"
import { useAuth } from "../../services/auth"
import ProfileMenu from "../ProfileMenu"

const Header = () => {
  const queryClient = useQueryClient()

  const auth: CurrentUserAuthData = useAuth(queryClient)

  return (
    <div className='fixed bg-blueGray-400 h-12 w-full z-100'>
      <div className='flex align-middle justify-end pr-14 py-1 space-x-3'>
        <div className='flex text-white text-base items-center justify-center'>
          {`Hello ${auth?.u}`}
        </div>
        <ProfileMenu />
      </div>
    </div>
  )
}

export default Header