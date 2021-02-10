import React from "react";
import { useQueryClient } from "react-query";
import MainContainer from "../../components/navigation";
import Error from 'next/error'
import Mayre from 'mayre'
import { CurrentUserAuthData } from "../../models/CurrentUserAuthData";
import { useAuth } from "../../services/auth";
import RecentAuthLogRecords from "./RecentAuthLogRecords";

export default function Dashboard() {
  const queryClient = useQueryClient()

  const auth: CurrentUserAuthData = useAuth(queryClient)

  return (
    <Mayre
      of={
        <MainContainer header='Dashboard'>
          <div className='flex flex-wrap justify-between'>
            Dashboard content
          </div>
          {auth?.r.includes('SUPREME_LEADER') &&
            <div className='p-3 border border-gray-900 w-1/3'>
              <p className='text-center font-semibold text-2xl'>Recent user login activity</p>
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