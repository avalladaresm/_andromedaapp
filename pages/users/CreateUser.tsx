import { Field, Form, Formik, FormikValues } from 'formik'
import React, { FC, useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import { ModalSettings } from '../../models/ModalSettings'
import { object, string } from 'yup'
import { FcCheckmark } from 'react-icons/fc';
import { Tooltip } from 'antd'
import Select from '../../components/Select'
import { FetchCitiesByState, FetchCountries, FetchStatesByCountry } from '../../services/location'

const CreateUser: FC<ModalSettings> = (props) => {
  const [countries, setCoutries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState<number>(undefined)
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState<string>('')

  const genderOptions = [{
    value: 'Male', displayValue: 'Male'
  }, {
    value: 'Female', displayValue: 'Female'
  }, {
    value: 'Other', displayValue: 'Other'
  }]

  useEffect(() => {
    const f = async () => {
      const c = await FetchCountries()
      const items = []
      c.data.map(x => {
        items.push({ value: x.id, displayValue: x.name })
      })
      setCoutries(items)
    }
    f()
  }, [])

  useEffect(() => {
    const f = async () => {
      const c = await FetchStatesByCountry(selectedCountry)
      const items = []
      c.data.map(x => {
        items.push({ value: x.id, displayValue: x.name })
      })
      setStates(items)
    }
    selectedCountry && f()
  }, [selectedCountry])

  useEffect(() => {
    const f = async () => {
      const c = await FetchCitiesByState(selectedState)
      const items = []
      c.data.map(x => {
        items.push({ value: x.id, displayValue: x.name })
      })
      setCities(items)
    }
    selectedState && f()
  }, [selectedState])

  const SignupSchema = object().shape({
    firstName: string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: string().email('Invalid email').required('Required'),
  });

  const initialValues: Partial<FormikValues> = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    gender: '',
    cellphone: '',
    address: '',
    cityId: '',
    stateId: '',
    countryId: '',
    city: '',
    state: '',
    country: '',
  }

  return (
    <Modal
      isShowing={props.isShowing}
      title='Create user'
    >
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={values => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched, initialValues, values, resetForm, dirty, setFieldValue, }) => (
          <Form>
            <div className='space-y-6'>

              <div className='flex flex-col space-y-4'>
                <div className='flex justify-between space-x-2'>
                  <div className='flex-grow'>

                    <div className='flex flex-row space-x-2'>
                      <label htmlFor='firstName'><span className='text-red-600'>*</span>First name</label>
                      {(values.firstName === initialValues.firstName && !touched.firstName) ?
                        null :
                        (errors.firstName ? (
                          <div className='text-red-600'>{errors.firstName}</div>
                        ) :
                          <FcCheckmark />)
                      }
                    </div>
                    <Field
                      name='firstName'
                      placeholder='Pedro'
                      className={`min-w-full ${(values.firstName === initialValues.firstName && !touched.firstName) ? '' : (errors.firstName ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} text-center shadow-sm rounded-sm h-10`}
                      style={{ outline: 'none' }}
                    />
                  </div>
                  <div className='flex-grow'>

                    <div className='flex flex-row space-x-2'>
                      <label htmlFor='middleName'>Middle name</label>
                      {(values.middleName === initialValues.middleName && !touched.middleName) ?
                        null :
                        (errors.middleName ? (
                          <div className='text-red-600'>{errors.middleName}</div>
                        ) :
                          <FcCheckmark />)
                      }
                    </div>
                    <Field
                      name='middleName'
                      placeholder='Ramirez'
                      className={`min-w-full ${(values.middleName === initialValues.middleName && !touched.middleName) ? '' : (errors.middleName ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} text-center shadow-sm rounded-sm h-10`}
                      style={{ outline: 'none' }}
                    />
                  </div>
                  <div className='flex-grow'>

                    <div className='flex flex-row space-x-2'>
                      <label htmlFor='lastName'><span className='text-red-600'>*</span>Last name</label>
                      {(values.lastName === initialValues.lastName && !touched.lastName) ?
                        null :
                        (errors.lastName ? (
                          <div className='text-red-600'>{errors.lastName}</div>
                        ) :
                          <FcCheckmark />)
                      }
                    </div>
                    <Field
                      name='lastName'
                      placeholder='Ramirez'
                      className={`min-w-full ${(values.lastName === initialValues.lastName && !touched.lastName) ? '' : (errors.lastName ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} text-center shadow-sm rounded-sm h-10`}
                      style={{ outline: 'none' }}
                    />
                  </div>
                </div>

                <div className='flex flex-row justify-between space-x-2'>
                  <div>

                    <div className='flex flex-row space-x-2'>
                      <label htmlFor='email'><span className='text-red-600'>*</span>Email</label>
                      {(values.email === initialValues.email && !touched.email) ?
                        null :
                        (errors.email ? (
                          <div className='text-red-600'>{errors.email}</div>
                        ) :
                          <FcCheckmark />)
                      }
                    </div>
                    <Field
                      name='email' type='email'
                      placeholder='pedro@ejemplo.com'
                      className={`min-w-full ${(values.email === initialValues.email && !touched.email) ? '' : (errors.email ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} text-center shadow-sm rounded-sm h-10`}
                      style={{ outline: 'none' }}
                    />
                  </div>
                  <div>

                    <div className='flex flex-row space-x-2'>
                      <label htmlFor='email'><span className='text-red-600'>*</span>Email</label>
                      {(values.email === initialValues.email && !touched.email) ?
                        null :
                        (errors.email ? (
                          <div className='text-red-600'>{errors.email}</div>
                        ) :
                          <FcCheckmark />)
                      }
                    </div>
                    <Field
                      name='email' type='email'
                      placeholder='pedro@ejemplo.com'
                      className={`min-w-full ${(values.email === initialValues.email && !touched.email) ? '' : (errors.email ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} text-center shadow-sm rounded-sm h-10`}
                      style={{ outline: 'none' }}
                    />
                  </div>
                  <div>
                    <Field name='gender'
                      children={({ field }) => (
                        <Select {...field} value={values.gender} onChange={(v: string) => setFieldValue(field.name, v)} items={genderOptions} defaultValue='Select a gender' label='Gender' />
                      )}
                    />
                  </div>
                  <div>

                    <div className='flex flex-row space-x-2'>
                      <label htmlFor='cellphone'>Cellphone</label>
                      {(values.cellphone === initialValues.cellphone && !touched.cellphone) ?
                        null :
                        (errors.cellphone ? (
                          <div className='text-red-600'>{errors.cellphone}</div>
                        ) :
                          <FcCheckmark />)
                      }
                    </div>
                    <Field
                      name='cellphone'
                      placeholder='pedro@ejemplo.com'
                      className={`min-w-full ${(values.cellphone === initialValues.cellphone && !touched.cellphone) ? '' : (errors.cellphone ? 'ring-2 ring-red-600 ring-inset ring-opacity-50' : 'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500')} text-center shadow-sm rounded-sm h-10`}
                      style={{ outline: 'none' }}
                    />
                  </div>
                  {/* <button type='submit'>Submit</button> */}
                </div>

                <div className='flex flex-row space-x-2'>
                  <div className='flex-grow'>
                    <Field name='country' className='min-w-full'
                      children={({ field }) => (
                        <Select {...field} value={values.country}
                          onChange={(v: string) => {
                            setFieldValue(field.name, v);
                            console.log('v', v);
                            setSelectedCountry(v);
                            setFieldValue('state', '');
                            setFieldValue('city', '');
                          }}
                          items={countries ?? []} defaultValue='Select a country' label='Country' />
                      )}
                    />
                  </div>
                  <div className='flex-grow'>
                    <Field name='state'
                      children={({ field }) => (
                        <Select {...field} disabled={!(selectedCountry.length > 0)} value={values.state}
                          onChange={(v: string) => {
                            setFieldValue(field.name, v);
                            setSelectedState(parseInt(v));
                            setFieldValue('city', '');
                          }}
                          items={states ?? []} defaultValue='Select a state' label='State' />
                      )}
                    />
                  </div>
                  <div className='flex-grow'>
                    <Field name='city'
                      children={({ field }) => (
                        <Select {...field} disabled={!(selectedState > 0)} value={values.city}
                          onChange={(v: string) => {
                            setFieldValue(field.name, v)
                            setSelectedCity(v)
                          }}
                          items={cities ?? []} defaultValue='Select a city' label='City' />
                      )}
                    />
                  </div>
                  {/* <button type='submit'>Submit</button> */}
                </div>

              </div>
              <div className='flex justify-end rounded-b space-x-2'>
                <button
                  className='px-3 py-2 rounded-md text-md font-semibold text-coolGray-50 bg-coolGray-500 hover:bg-coolGray-600 active:bg-coolGray-900 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 active:shadow-inner'
                  type='button'
                  style={{ transition: 'all .15s ease', outline: 'none' }}
                  onClick={() => { resetForm(initialValues), setSelectedCountry(''), setSelectedState(undefined) }}
                >
                  Reset
                  </button>
                {dirty ?
                  <Tooltip title='Your current data will be lost.' mouseEnterDelay={0}>
                    <button
                      className='px-3 py-2 rounded-md text-md font-semibold text-coolGray-50 bg-red-500 hover:bg-red-600 active:bg-red-900 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 active:shadow-inner'
                      type='button'
                      style={{ transition: 'all .15s ease', outline: 'none' }}
                      onClick={() => props.onCancel(false)}
                    >
                      Cancel
                    </button>
                  </Tooltip> :
                  <button
                    className='px-3 py-2 rounded-md text-md font-semibold text-coolGray-50 bg-red-500 hover:bg-red-600 active:bg-red-900 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 active:shadow-inner'
                    type='button'
                    style={{ transition: 'all .15s ease', outline: 'none' }}
                    onClick={() => props.onCancel(false)}
                  >
                    Cancel
                  </button>
                }

                <button
                  className='px-3 py-2 rounded-md text-md font-semibold text-coolGray-50 bg-lightBlue-500 hover:bg-lightBlue-600 active:bg-lightBlue-900 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 active:shadow-inner'
                  type='button'
                  style={{ transition: 'all .15s ease', outline: 'none' }}
                  onClick={() => console.log('values', values)}
                >
                  Save
                </button>
              </div>

            </div>

          </Form>
        )}
      </Formik>
    </Modal>
  )
}

export default CreateUser