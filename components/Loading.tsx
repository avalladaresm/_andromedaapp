import { Spin } from 'antd'

const Loading: React.FC<unknown> = () => {
  console.log('loading bitch')
  return (
    <div style={{ textAlign: 'center' }}>
      <Spin size='large' />
    </div>
  )
}

export default Loading
