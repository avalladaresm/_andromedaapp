import React from 'react'
import Login from '../pages/auth/login';
import Navigation from '../components/navigation'
import { AuthCookie } from '../models/AuthCookie';
import { useAuth } from '../services/auth';
import { useQueryClient } from 'react-query';
import Mayre from 'mayre'

const Home = () => {
  const queryClient = useQueryClient()
  const auth: AuthCookie = useAuth(queryClient)

  return (
    <Mayre
      of={
        <Navigation></Navigation>
      }
      or={
        <Mayre
          of={<div>Signing you in...</div>}
          or={<Login />}
          when={!auth?.role}
        />
      }
      when={!!auth?.uid && !!auth?.role}
    />
  )
}

export default Home