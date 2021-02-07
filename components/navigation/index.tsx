import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Sidebar } from './Sidebar'
import Content from './Content'
import Header from './Header'

const MainContainer = (props) => {
  const [loadingMessage, setLoadingMessage] = useState<string>(undefined)

  const router = useRouter()

  useEffect(() => {
    setLoadingMessage('Redirecting you to your dashboard...')
  }, [])

  return (
    <>
      <Sidebar {...props} />
      <Header />
      <Content {...props}>
        {router.pathname === '/' && loadingMessage}
        {props.children}
      </Content>
    </>
  )
}

export default MainContainer