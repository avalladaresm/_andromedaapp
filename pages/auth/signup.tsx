import { useRouter } from 'next/router';
import { useEffect } from 'react'
import { SignupCard } from '../../components/signupcard'

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
      <SignupCard />
    </div>
  )
}