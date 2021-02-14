import React from "react";
import { useQueryClient } from "react-query";
import Mayre from "mayre";
import { CurrentUserAuthData } from "../../models/CurrentUserAuthData";
import { useAuth } from "../../services/auth";
import MainContainer from "../../components/navigation";
import Error from 'next/error'
import AuthLogTable from "./AuthLogTable";
import { Context } from "vm";
import { documentCookieJsonify } from "../../utils/utils";
import Spin from "../../components/Spin";

const LoginHistory = (props) => {

  const queryClient = useQueryClient()
  const auth: CurrentUserAuthData = useAuth(queryClient)

  return (
    <Mayre
      of={
        <MainContainer header='Login/Logout history'>
          <Mayre
            of={<div>Verifying your credentials...</div>}
            or={<AuthLogTable {...props} />}
            when={!auth?.a_t}
          />
        </MainContainer >
      }
      or={
        <Mayre
          of={<div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <Spin size={100} />
            </div>}
          or={<Error statusCode={404} />}
          when={!auth?.r}
        />
      }
      when={auth?.r.includes('SUPREME_LEADER')}
    />
  )
}

export const getServerSideProps = async (ctx: Context) => {
  const parsedCookie: CurrentUserAuthData = ctx.req.headers.cookie && documentCookieJsonify(ctx.req?.headers?.cookie)

  if (!parsedCookie.a_t) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      cookies: {
        u: parsedCookie.u,
        a_t: parsedCookie.a_t
      }
    }
  }
}

export default LoginHistory