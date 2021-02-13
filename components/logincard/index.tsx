import { FC, useState } from "react"
import { LoginSettings } from "../../models/LoginSettings"
import Spin from "../Spin"
import { TempLogo } from "../TempLogo"
import { useDoLogin } from '../../services/auth'
import { useRouter } from 'next/router'
import { useQueryClient } from "react-query"
import { AccountLogIn } from "../../models/Auth"
import IPData from 'ipdata';
import { getPlatformData } from "../../utils/utils"
const ipdata = new IPData(`${process.env.IPDATA_APIKEY}`);

export const LoginCard: FC<LoginSettings> = () => {
  const [loginData, setLoginData] = useState<AccountLogIn>()

  const queryClient = useQueryClient()
  const router = useRouter();
  const doLogin = useDoLogin(queryClient, router)

  const onLogin = async () => {
    const ip = await ipdata.lookup()
    let platform = getPlatformData()
    platform = { ...platform, ip: ip.ip }
    doLogin.mutate({ ...loginData, platform: platform })
  }

  return (
    <div style={{ height: '20rem' }} className='bg-gradient-to-br from-lightBlue-300 to-indigo-400 place-self-center rounded-2xl w-96 border-solid border-blueGray-700 shadow-2xl px-5 py-5 space-y-3'>
      <div className='flex flex-col space-y-3'>
        <TempLogo className='self-center' />
        <p className='text-center font-sans font-semibold text-2xl text-blueGray-50'>
          Login
			</p>
      </div>
      <form method='post' className='flex flex-col space-y-6'>
        <div className='flex flex-col self-center w-9/12 space-y-1'>
          <input style={{ outline: 'none' }} type='text' onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} className='text-center shadow-xl rounded-t-md h-8 focus:ring-4 focus:ring-opacity-75 focus:ring-blue-500 ' placeholder='username' />
          <input style={{ outline: 'none' }} type='password' onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className='text-center shadow-xl rounded-b-md h-8 focus:ring-4 focus:ring-opacity-75 focus:ring-blue-500' placeholder='password' />
        </div>
        <div className='flex flex-col self-center w-1/2 space-y-3'>
          {doLogin.isLoading ?
            <button disabled type='button' className='h-8 rounded-md bg-blueGray-400 text-md font-semibold disabled:opacity-75 text-coolGray-50 flex flex-row justify-center items-center cursor-wait'>
              <Spin /> logging in...
						</button> :
            <button onClick={() => onLogin()} type='button' className='h-8 rounded-md bg-lightBlue-500 hover:bg-lightBlue-700 hover:shadow-inner shadow-md text-md font-semibold text-coolGray-50 flex flex-row justify-center items-center'>
              Enter
						</button>
          }
        </div>
      </form>
      <div className='flex align-middle justify-center text-gray-50'>
        Don't have an account yet? <a onClick={() => router.push('/auth/signup')} className='pl-1 text-blue-800 hover:text-blue-800 hover:underline'>Sign up</a>
      </div>
    </div>
  )
}