import React, { useContext } from 'react'
import Login from '../pages/auth/login';
import Navigation from '../components/navigation'
import UserContext from '../context/UserContext';

const Home = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      {currentUser === undefined ?
        <Login /> :
        <Navigation></Navigation>
      }
    </>
  )
}

export default Home