import React from 'react'
import Navigation from '../components/navigation'
import { CurrentUserAuthData } from '../models/CurrentUserAuthData';
import { useAuth } from '../services/auth';
import { useQueryClient } from 'react-query';
import Mayre from 'mayre'

const Home = () => {
  const queryClient = useQueryClient()
  const auth: CurrentUserAuthData = useAuth(queryClient)

  return (
    <Mayre
      of={
        <Navigation></Navigation>
      }
      or={
        <Mayre
          of={<div>Signing you in...</div>}
          when={!!auth?.r}
        />
      }
      when={!!auth?.u && !!auth?.r}
    />
  )
}

export default Home