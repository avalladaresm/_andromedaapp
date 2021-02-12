import React from "react";
import { useQueryClient } from "react-query";
import Mayre from "mayre";
import { CurrentUserAuthData } from "../../models/CurrentUserAuthData";
import { useAuth } from "../../services/auth";
import MainContainer from "../../components/navigation";
import Error from 'next/error'
import AuthLogTable from "./AuthLogTable";

const LoginHistory = () => {

  const queryClient = useQueryClient()
  const auth: CurrentUserAuthData = useAuth(queryClient)

  return (
    <Mayre
      of={
        <MainContainer header='Login/Logout history'>
          <Mayre
            of={<div>Verifying your credentials...</div>}
            or={<AuthLogTable />}
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

export default LoginHistory