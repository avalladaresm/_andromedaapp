import { Spin } from 'antd'
import { useState } from 'react'
import { useAuth } from '../services/auth'

const Loading: React.FC<unknown> = (props) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Spin size='large' tip={props.loadingUserPreferences} />
    </div>
  )
}

export default Loading
