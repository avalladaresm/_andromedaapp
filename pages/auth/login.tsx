import { useRouter } from 'next/router';
import { useEffect } from 'react'
import { LoginCard } from '../../components/logincard'

export default function Login() {
  const router = useRouter()

  useEffect(() => {
    const parsedCookie = {
      uid: document.cookie.split(';')[0]?.split('=')[1],
      a_token: document.cookie.split(';')[1]?.split('=')[1]
    }

    if (parsedCookie.uid && parsedCookie.a_token) router.push('/')
  }, [])

  return (
    <div className='w-full h-screen bg-gradient-to-tl from-coolGray-300 to-blueGray-500 flex justify-center'>
      <LoginCard />
    </div>
  )
}