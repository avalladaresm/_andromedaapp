import { useState } from 'react'
import { Button, Input, Modal, Form, DatePicker, Select } from 'antd'
import { queryGetCitiesByStateId, queryGetStatesByCountryId } from '../../../services/users'
const { Option } = Select

const CreateForm = ({ visible, onCreate, onCancel, loading }) => {
  const [form] = Form.useForm()
  const [stateSelectDisabled, handleStateSelectDisabled] = useState(true)
  const [citySelectDisabled, handleCitySelectDisabled] = useState(true)
  const [statesForSelectedCountry, handleStatesForSelectedCountry] = useState([])
  const [citiesForSelectedState, handleCitiesForSelectedState] = useState([])

  const onCountryChange = async (value) => {
    handleStateSelectDisabled(false)
    const d = await queryGetStatesByCountryId(value)
    handleStatesForSelectedCountry(d.data)
  }

  const onStateChange = async (value) => {
    handleCitySelectDisabled(false)
    const d = await queryGetCitiesByStateId(value)
    handleCitiesForSelectedState(d.data)
    form.setFieldsValue({ cityId: '' })
  }

  return (
    <Modal
      visible={visible}
      // width={window.innerWidth > 576 ? '50%':''}
      title='Create a new user'
      okText='Create'
      cancelText='Cancel'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            values.dob = values.dob.format('YYYY-MM-DD')
            onCreate(values)
          })
          .catch(info => {
            console.log('Validate Failed:', info)
          })
      }}
      footer={[
        <Button
          key='clean' loading={loading} onClick={() => {
            form.resetFields()
          }}
        >
          Clean
        </Button>,
        <Button key='cancel' onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key='submit' type='primary' loading={loading} onClick={() => {
            form
              .validateFields()
              .then(values => {
                values.dob = values.dob.format('YYYY-MM-DD')
                onCreate(values)
              })
              .catch(info => {
                console.log('Validate Failed:', info)
              })
          }}
        >
          Create
        </Button>
      ]}
    >
      <Form
        form={form}
        layout='inline'
        name='form_in_modal'
      >
        <Form.Item
          name='userName' label='Username' rules={[{
            required: true,
            message: 'Please input your username!'
          }]}
        >
          <Input id='username' autoComplete='off' />
        </Form.Item>
        <Form.Item
          name='password' label='Password' rules={[{
            required: true,
            message: 'Please input your password!'
          }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name='firstName' label='First name' rules={[{
            required: true,
            message: 'Please input your first name!'
          }]}
        >
          <Input id='firstName' autoComplete='off' />
        </Form.Item>
        <Form.Item name='middleName' label='Middle name'>
          <Input id='middleName' autoComplete='off' />
        </Form.Item>
        <Form.Item
          name='lastName' label='Last name' rules={[{
            required: true,
            message: 'Please input your last name!'
          }]}
        >
          <Input id='lastName' autoComplete='off' />
        </Form.Item>
        <Form.Item
          name='gender' label='Gender' rules={[{
            required: true,
            message: 'Please input your gender!'
          }]}
        >
          <Select dropdownMatchSelectWidth={false}>
            <Option value='Female'>Female</Option>
            <Option value='Male'>Male</Option>
            <Option value='Other'>Other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name='dob' label='DOB' rules={[{
            required: true,
            message: 'Please input your date of birth!'
          }]}
        >
          <DatePicker style={{ width: '100%' }} onChange={(date, dateString) => { return dateString }} />
        </Form.Item>
        <Form.Item
          name='email' label='Email' rules={[{
            required: true,
            message: 'Please input your email!'
          }]}
        >
          <Input id='email' autoComplete='off' />
        </Form.Item>
        <Form.Item
          name='cellphone' label='Cellphone' rules={[{
            required: true,
            message: 'Please input your cellphone!'
          }]}
        >
          <Input id='cellphone' autoComplete='off' />
        </Form.Item>
        <Form.Item name='address' label='Address'>
          <Input id='address' autoComplete='off' />
        </Form.Item>
        <Form.Item name='cityId' label='City'>
          <Select disabled={citySelectDisabled} dropdownMatchSelectWidth={false}>
            {citiesForSelectedState && citiesForSelectedState.map((city, i) => (
              <Option value={city.id} key={i}>{city.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='stateId' label='State'>
          <Select onChange={onStateChange} disabled={stateSelectDisabled} dropdownMatchSelectWidth={false}>
            {statesForSelectedCountry && statesForSelectedCountry.map((state, i) => (
              <Option value={state.id} key={i}>{state.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='countryId' label='Country'>
          <Select onChange={onCountryChange} dropdownMatchSelectWidth={false}>
            <Option value='HN'>Honduras</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateForm
