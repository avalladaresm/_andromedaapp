import { FC, useState } from "react"
import { LoginSettings } from "../../models/LoginSettings"
import Spin from "../Spin"
import { TempLogo } from "../TempLogo"
import { setAuth, useDoLogin } from '../../services/auth'
import { message } from "antd"
import { useRouter } from 'next/router'
import { AxiosError } from "axios"
import { useQueryClient } from "react-query"

interface ILogin {
  username: string
  password: string
}

export const LoginCard: FC<LoginSettings> = () => {
  const [loginData, setLoginData] = useState<ILogin>()

  const queryClient = useQueryClient()
  const doLogin = useDoLogin()
  const router = useRouter();

  const onLogin = () => {
    doLogin.mutate(loginData, {
      onSuccess: (data, variables) => {
        const cookie = data.data.split('|')
        const authData = { uid: cookie[0], a_token: cookie[1] }
        setAuth(queryClient, authData)
        document.cookie = 'uid=' + authData.uid
        document.cookie = 'a_token=' + authData.a_token
        message.success(`Login success, whoo! Welcome ${variables.username}`)
        router.push('/')
      },
      onError: (error: AxiosError) => {
        message.error('Login failed!')
        console.log('erorrr', error)
      }
    })
  }

  return (
    <div style={{height: '30rem'}} className='bg-gradient-to-br from-lightBlue-300 to-indigo-400 place-self-center rounded-2xl w-96 border-solid border-blueGray-700 shadow-2xl px-5 py-5 space-y-3'>
      <div className='flex flex-col space-y-3'>
        <TempLogo className='self-center' />
        <p className='text-center font-sans font-semibold text-2xl text-blueGray-50'>
          Login
			</p>
      </div>
      <form method='post' className='flex flex-col space-y-6'>
        <div className='flex flex-col self-center w-9/12 space-y-1'>
          <input style={{ outline: 'none' }} type='text' onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} className='text-center shadow-xl rounded-t-md h-10 focus:ring-4 focus:ring-opacity-75 focus:ring-blue-500 ' placeholder='username' />
          <input style={{ outline: 'none' }} type='password' onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className='text-center shadow-xl rounded-b-md h-10 focus:ring-4 focus:ring-opacity-75 focus:ring-blue-500' placeholder='password' />
        </div>
        <div className='flex flex-col self-center w-6/12 space-y-3'>
          {doLogin.isLoading ?
            <button disabled type='button' className='h-10 rounded-md bg-blueGray-400 text-md font-semibold disabled:opacity-75 text-coolGray-50 flex flex-row justify-center items-center cursor-wait'>
              <Spin /> logging in...
						</button> :
            <button onClick={() => onLogin()} type='button' className='h-10 rounded-md bg-lightBlue-500 hover:bg-lightBlue-700 hover:shadow-inner shadow-md text-md font-semibold text-coolGray-50 flex flex-row justify-center items-center'>
              Enter
						</button>
          }
        </div>
      </form>
    </div>
  )
}