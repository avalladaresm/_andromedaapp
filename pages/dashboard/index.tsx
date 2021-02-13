import React from "react";
import { useQueryClient } from "react-query";
import MainContainer from "../../components/navigation";
import Error from 'next/error'
import Mayre from 'mayre'
import { CurrentUserAuthData } from "../../models/CurrentUserAuthData";
import { useAuth } from "../../services/auth";
import RecentAuthLogRecords from "./RecentAuthLogRecords";
import { useRouter } from "next/router";
import { Context } from "vm";
import { documentCookieJsonify } from "../../utils/utils";

const Dashboard = (props) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const auth: CurrentUserAuthData = useAuth(queryClient)

  return (
    <Mayre
      of={
        <MainContainer header='Dashboard'>
          {auth?.r.includes('SUPREME_LEADER') &&
            <div className='flex flex-wrap'>
              <div className='flex flex-col m-3 p-3 rounded-md bg-blueGray-200 shadow-md sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 items-center'>
                <p className='text-center font-semibold text-2xl'>Recent user login activity</p>
                <p className='text-center'>Showing the 10 most recent records, click <a className='text-blue-500 hover:text-blue-800 hover:cursor-pointer underline' onClick={() => router.push('/loginhistory')}>here</a> to view complete login history</p>
                <RecentAuthLogRecords {...props} />
              </div>
            </div>
          }
        </ MainContainer>
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

export default Dashboard