import React from 'react'
import { Sidebar } from './Sidebar'

const MainContainer = (props) => {
  return (
    <Sidebar {...props}>
      {props.children}
    </Sidebar>
  )
}

export default MainContainer