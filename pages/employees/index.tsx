import React from "react";
import { useIsFetching, useQueryClient } from "react-query";
import Navigation from "../../components/navigation";
import ProductItem from "../products/ProductItem";
import Error from 'next/error'
import Mayre from 'mayre'
import { CurrentUserAuthData } from "../../models/CurrentUserAuthData";
import { useAuth } from "../../services/auth";
import router from "next/router";

export default function Employees() {
  const isFetching = useIsFetching()
  const queryClient = useQueryClient()

  const auth: CurrentUserAuthData = useAuth(queryClient)

  return (
    <Mayre
      of={
        <Navigation
          actionBar={{
            pageTitle: 'Employees',
            navItems: [{
              title: 'Refresh', onClick: () => { }
            }, {
              title: 'New Employee', onClick: () => router.push('/employees/new')
            }],
            isLoading: isFetching === 1
          }}
        >
          <div className='flex flex-wrap justify-between'>

          </div>

        </Navigation>
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