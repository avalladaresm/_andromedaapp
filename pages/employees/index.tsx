import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import MainContainer from "../../components/navigation";
import Error from 'next/error'
import Mayre from 'mayre'
import { CurrentUserAuthData } from "../../models/CurrentUserAuthData";
import { useAuth } from "../../services/auth";
import EmployeeTable from "./EmployeeTable";
import { Context } from "vm";
import { documentCookieJsonify } from "../../utils/utils";
import Spin from "../../components/Spin";
import { getCurrentEmployerId } from "../../services/employee";
import { ActivityLogType } from "../../models/ActivityLogType";
import { createActivityLog } from "../../services/activitylog";
import { useRouter } from "next/router";
import { usePlatformSettings } from "../../services/appsettings";

const Employees = (props) => {
  const queryClient = useQueryClient()

  const auth: CurrentUserAuthData = useAuth(queryClient)
  const router = useRouter()
  const platform = usePlatformSettings(queryClient)

  useEffect(() => {
    (async () => {
      await createActivityLog(props?.cookies?.a_t, props?.cookies?.u, ActivityLogType.VISITED_PAGE, router.pathname, platform)
    })()
  }, [])

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
          of={<div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <Spin size={100} />
          </div>}
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

  const employerId = await getCurrentEmployerId(parsedCookie.a_t, parsedCookie.u)

  return {
    props: {
      cookies: {
        u: parsedCookie.u,
        a_t: parsedCookie.a_t,
        aid: employerId
      }
    }
  }
}

export default Employees