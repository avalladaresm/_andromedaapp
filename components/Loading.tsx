import { Spin } from 'antd'
import { useState } from 'react'
import { useAuth } from '../services/auth'

const Loading: React.FC<unknown> = () => {
	const [loadingTip, setLoadingTip] = useState<string>('')
	const auth = useAuth()
	
	// if (auth.isLoading) {
	// 	setLoadingTip('Signing in...')
	// }

  return (
    <div style={{ textAlign: 'center' }}>
      <Spin size='large' tip={loadingTip} />
    </div>
  )
}

export default Loading
