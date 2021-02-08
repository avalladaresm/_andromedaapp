import React from "react";
import { useQueryClient } from "react-query";
import MainContainer from "../../components/navigation";
import Error from 'next/error'
import Mayre from 'mayre'
import { CurrentUserAuthData } from "../../models/CurrentUserAuthData";
import { useAuth } from "../../services/auth";
import EmployeeTable from "./EmployeeTable";

export default function Employees() {
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
            or={<EmployeeTable />}
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
        auth?.r === 'SUPREME_LEADER' ||
        auth?.r === 'PERSON_ADMIN' ||
        auth?.r === 'BUSINESS_ADMIN'
      }
    />
  )
}