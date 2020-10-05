import { Card, Form, Input, Button, message } from 'antd'
import { useRouter } from 'next/router'
import { SignInStatus } from '../../models/SignInStatus'
import { useCreateLog } from '../../services/logs'
import { useDoSignIn } from '../../services/auth'
import moment from 'moment'
import { LogTypes } from '../../models/LogTypes'
import { queryCache } from 'react-query'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
}

const Login = () => {
  const router = useRouter()
	const [doSignIn, doSignInInfo] = useDoSignIn()
	const [createLog] = useCreateLog()

  const onFinish = values => {
		doSignIn(values, {
			onSuccess: (data, variables) => {
				message.success(`Login success, whoo! Welcome ${variables.username}`)
				queryCache.setQueryData('Auth', data)
				Cookies.set('currentUser', JSON.stringify(data.data), { expires: 7 })
				createLog({
					userName: variables?.username,
					date: moment(),
					type: LogTypes.SIGNIN,
					description: `${SignInStatus.SIGN_IN_SUCCESS}: ${variables?.username} signed in successfully.`,
					data: JSON.stringify(`${SignInStatus.SIGN_IN_SUCCESS}`)
				})
				router.push('/dashboard')
			},
			onError: (error: AxiosError, variables) => {
				message.error('Login failed!')
				createLog({
					userName: variables?.username,
					date: moment(),
					type: LogTypes.SIGNIN,
					description: `${SignInStatus.SIGN_IN_ERROR}: ${variables.username} had an error logging in.`,
					data: JSON.stringify(error.response.data)
				})
			}
		})
  }

  return (
		<Card style={{width:400,margin:'0 auto', float: 'none', marginBottom:'10px', marginTop:50}}>
			<Form
				{...layout}
				name='basic'
				initialValues={{ remember: true }}
				onFinish={onFinish}
			>
				<Form.Item
					label='Username'
					name='username'
					rules={[{ required: true, message: 'Please input your username!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Password'
					name='password'
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button type='primary' htmlType='submit' loading={doSignInInfo.isLoading}>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</Card>
  )
}

export default Login
