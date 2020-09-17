import { Spin } from 'antd';

const Loading = () => {
  console.log('loading bitch')
  return (
    <div style={{ textAlign: 'center' }}>
      <Spin size='large' />
    </div>
  )
}

export default Loading