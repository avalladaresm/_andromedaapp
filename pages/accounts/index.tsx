import React from "react";
import { useQueryClient } from "react-query";
import PersonTable from "./PersonTable";
import Mayre from "mayre";
import { CurrentUserAuthData } from "../../models/CurrentUserAuthData";
import { useAuth } from "../../services/auth";
import BusinessTable from "./BusinessTable";
import MainContainer from "../../components/navigation";
import Error from 'next/error'
import { Context } from "vm";
import { documentCookieJsonify } from "../../utils/utils";

const Accounts = (props) => {

  const queryClient = useQueryClient()
  const auth: CurrentUserAuthData = useAuth(queryClient)

  return (
    <Mayre
      of={
        <MainContainer header='Accounts'>
          <Mayre
            of={<div>Verifying your credentials...</div>}
            or={<PersonTable {...props} />}
            when={!auth?.a_t}
          />
          <Mayre
            of={<div>Verifying your credentials...</div>}
            or={<BusinessTable {...props} />}
            when={!auth?.a_t}
          />
        </MainContainer >
      }
      or={
        <Mayre
          of={<div>Loading buddy</div>}
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

  if (!parsedCookie?.a_t) {
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

export default Accounts