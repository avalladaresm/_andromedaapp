import '../less/antd-custom.less' // includes antd style and our customization
import { Button, DatePicker, Form, InputNumber, Select, Slider, Switch } from 'antd'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import Cookies from 'js-cookie'

import MainLayout from '../layouts/main'
import { useState, useEffect } from 'react'

const FormItem = Form.Item
const Option = Select.Option

export default function Home() {
  const [currentUser, setCurrentUser] = useState({})
  const router = useRouter()

  /* useEffect(() => {
    console.log('rip')
    try {
      setCurrentUser(JSON.parse(Cookies.get('currentUser')))
      router.push('/')
      console.log('user found')
    } catch (e) {
      router.push('/auth/login')
      console.log('rip')
    }
    return () => {}
  }, []) */

  return (
    <>
      <MainLayout>
        <Form layout="horizontal" style={{ minHeight: '100vh' }}>
          <FormItem
            label="Input Number"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <InputNumber
              size="large"
              min={1}
              max={10}
              style={{ width: 100 }}
              defaultValue={3}
              name="inputNumber"
            />
            <a href="#">Link</a>
          </FormItem>

          <FormItem
            label="Switch"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <Switch defaultChecked />
          </FormItem>

          <FormItem
            label="Slider"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <Slider defaultValue={70} />
          </FormItem>

          <FormItem
            label="Select"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <Select size="large" defaultValue="lucy" style={{ width: 192 }}>
              <Option value="jack">jack</Option>
              <Option value="lucy">lucy</Option>
              <Option value="disabled" disabled>
                disabled
              </Option>
              <Option value="yiminghe">yiminghe</Option>
            </Select>
          </FormItem>

          <FormItem
            label="DatePicker"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <DatePicker name="startDate" />
          </FormItem>
          <FormItem style={{ marginTop: 48 }} wrapperCol={{ span: 8, offset: 8 }}>
            <Button size="large" type="primary" htmlType="submit">
              OK
            </Button>
            <Button size="large" style={{ marginLeft: 8 }}>
              Cancel
            </Button>
          </FormItem>
        </Form>
      </MainLayout >
    </>
  )
}
