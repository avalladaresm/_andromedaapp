import React from "react";
import { useQueryClient } from "react-query";
import PersonTable from "./PersonTable";
import Mayre from "mayre";
import { CurrentUserAuthData } from "../../models/CurrentUserAuthData";
import { useAuth } from "../../services/auth";
import BusinessTable from "./BusinessTable";
import MainContainer from "../../components/navigation";
import Error from 'next/error'

export default function Accounts() {

  const queryClient = useQueryClient()
  const auth: CurrentUserAuthData = useAuth(queryClient)

  return (
    <Mayre
      of={
        <MainContainer header='Accounts'>
          <Mayre
            of={<div>Verifying your credentials...</div>}
            or={<PersonTable />}
            when={!auth?.a_t}
          />
          <Mayre
            of={<div>Verifying your credentials...</div>}
            or={<BusinessTable />}
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