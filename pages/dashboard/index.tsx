import React from "react";
import { useQueryClient } from "react-query";
import MainContainer from "../../components/navigation";
import Error from 'next/error'
import Mayre from 'mayre'
import { CurrentUserAuthData } from "../../models/CurrentUserAuthData";
import { useAuth } from "../../services/auth";
import RecentAuthLogRecords from "./RecentAuthLogRecords";
import { useRouter } from "next/router";

export default function Dashboard() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const auth: CurrentUserAuthData = useAuth(queryClient)

  return (
    <Mayre
      of={
        <MainContainer header='Dashboard'>
          {auth?.r.includes('SUPREME_LEADER') &&
            <div className='flex flex-col p-3 rounded-md bg-blueGray-200 shadow-md w-1/4 items-center'>
              <p className='text-center font-semibold text-2xl'>Recent user login activity</p>
              <p className='text-center'>Showing the 10 most recent records, click <a onClick={() => router.push('/loginhistory')}>here</a> to view complete login history</p>
              <RecentAuthLogRecords />
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