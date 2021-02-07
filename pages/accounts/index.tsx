import React, { useState } from "react";
import { useQueryClient } from "react-query";
import CreateAccount from "./CreateAccount";
import PersonTable from "./PersonTable";
import Mayre from "mayre";
import { CurrentUserAuthData } from "../../models/CurrentUserAuthData";
import { useAuth } from "../../services/auth";
import BusinessTable from "./BusinessTable";
import MainContainer from "../../components/navigation";

export default function Accounts() {
  const [showCreateAccount, setShowCreateAccount] = useState(false)

  const queryClient = useQueryClient()
  const auth: CurrentUserAuthData = useAuth(queryClient)

  return (
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
      <CreateAccount
        isShowing={showCreateAccount}
        title='Create account'
        onCancel={() => setShowCreateAccount(false)}
      />
    </MainContainer >
  )
}