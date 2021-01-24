import React from 'react'
import Login from '../pages/auth/login';
import Navigation from '../components/navigation'
import { AuthCookie } from '../models/AuthCookie';
import { useAuth } from '../services/auth';
import { useQueryClient } from 'react-query';

const Home = (props) => {
  const queryClient = useQueryClient()
  const auth: AuthCookie = useAuth(queryClient)

  return (
    <>
      {auth?.uid === undefined ?
        <Login /> :
        <Navigation currentUserRole={props.currentUserRole}></Navigation>
      }
    </>
  )
}

export default Home