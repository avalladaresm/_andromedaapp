import React from 'react'
import Navigation from '../components/navigation'
import { CurrentUserAuthData } from '../models/CurrentUserAuthData';
import { useAuth } from '../services/auth';
import { useQueryClient } from 'react-query';
import Mayre from 'mayre'
import { Context } from 'vm';
import { documentCookieJsonify } from '../utils/utils';

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

export const getServerSideProps = async (ctx: Context) => {
  const parsedCookie: CurrentUserAuthData = ctx.req.headers.cookie && documentCookieJsonify(ctx.req?.headers?.cookie)

  if (!parsedCookie?.a_t) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  return {
    redirect: {
      destination: '/dashboard',
      permanent: false
    }
  }
}

export default Home