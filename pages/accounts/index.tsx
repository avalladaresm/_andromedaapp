import React, { useState } from "react";
import { useQueryClient, useIsFetching } from "react-query";
import Navigation from "../../components/navigation";
import CreateAccount from "./CreateAccount";
import PersonTable from "./PersonTable";
import Mayre from "mayre";
import { AuthCookie } from "../../models/AuthCookie";
import { useAuth } from "../../services/auth";
import BusinessTable from "./BusinessTable";

export default function Accounts() {
  const [showCreateAccount, setShowCreateAccount] = useState(false)

  const queryClient = useQueryClient()
  const isFetching = useIsFetching()
  const auth: AuthCookie = useAuth(queryClient)

  return (
    <Navigation
      actionBar={{
        pageTitle: 'Accounts',
        navItems: [{
          title: 'Refresh', onClick: () => { queryClient.refetchQueries(['PersonAccounts', 'BusinessAccounts']) }
        }, {
          title: 'New Account', onClick: () => { setShowCreateAccount(true) }
        }],
        isLoading: isFetching === 1
      }}
    >
      <Mayre
        of={<div>Verifying your credentials...</div>}
        or={<PersonTable />}
        when={!auth?.a_token}
      />
      <Mayre
        of={<div>Verifying your credentials...</div>}
        or={<BusinessTable />}
        when={!auth?.a_token}
      />
      <CreateAccount
        isShowing={showCreateAccount}
        title='Create account'
        onCancel={() => setShowCreateAccount(false)}
      />
    </Navigation>
  )
}