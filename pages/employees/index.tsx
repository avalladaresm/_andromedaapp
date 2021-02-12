import React from "react";
import { useQueryClient } from "react-query";
import MainContainer from "../../components/navigation";
import Error from 'next/error'
import Mayre from 'mayre'
import { CurrentUserAuthData } from "../../models/CurrentUserAuthData";
import { useAuth } from "../../services/auth";
import EmployeeTable from "./EmployeeTable";
import { Context } from "vm";
import { documentCookieJsonify } from "../../utils/utils";

const Employees = (props) => {
  const queryClient = useQueryClient()

  const auth: CurrentUserAuthData = useAuth(queryClient)

  return (
    <Mayre
      of={
        <MainContainer header='Employees'>
          <div className='flex flex-wrap justify-between'>
            Employees content
          </div>
          <Mayre
            of={<div>Verifying your credentials...</div>}
            or={<EmployeeTable {...props} />}
            when={!auth?.a_t}
          />
        </MainContainer>
      }
      or={
        <Mayre
          of={<div>Loading buddy</div>}
          or={<Error statusCode={404} />}
          when={!auth?.r}
        />
      }
      when={
        auth?.r.includes('SUPREME_LEADER') ||
        auth?.r.includes('PERSON_ADMIN') ||
        auth?.r.includes('BUSINESS_ADMIN')
      }
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
        a_st: parsedCookie.a_t
      }
    }
  }
}

export default Employees