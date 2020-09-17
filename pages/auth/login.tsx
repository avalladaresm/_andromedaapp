import { Form, Input, Button, Checkbox, message } from 'antd';
import { DoSignIn } from '../../services/auth'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { SignInStatus } from '../../models/SignInStatus'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const loggedInUser = useSelector(state => state.auth.loggedInUser)
  const isSigningIn = useSelector(state => state.auth.isSigningIn)
  const signInStatus = useSelector(state => state.auth.signInStatus)
  
  useEffect(() => {
    if (signInStatus === SignInStatus.SIGN_IN_SUCCESS) {
      message.success(`Login success, whoo! Welcome ${loggedInUser.userName}`)
      router.push('/')
    }
    else if (signInStatus === SignInStatus.SIGN_IN_ERROR)
      message.error('Error!!!!')
    return () => {
      
    }
  }, [signInStatus])

  const onFinish = values => {
    console.log('Success:', values);
    dispatch(DoSignIn(values))
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name='basic'
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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

      <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit' loading={isSigningIn}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login