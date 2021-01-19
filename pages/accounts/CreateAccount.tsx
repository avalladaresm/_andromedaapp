import { Field, Form, Formik, FormikValues } from 'formik'
import React, { FC, useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import { ModalSettings } from '../../models/ModalSettings'
import { object, string } from 'yup'
import { FcCheckmark } from 'react-icons/fc';
import { Tooltip, DatePicker } from 'antd'
import Select from '../../components/Select'
import { FetchCitiesByState, FetchCountries, FetchStatesByCountry } from '../../services/location'

const CreateAccount: FC<ModalSettings> = (props) => {
  const [countries, setCoutries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState<number>()
  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState<number>(undefined)
  const [cities, setCities] = useState([])

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
    name: string()
      .min(2, 'Too Short!')
      .max(255, 'Too Long!')
      .required('Required'),
    surname: string()
      .min(2, 'Too Short!')
      .max(255, 'Too Long!')
      .required('Required'),
    username: string()
      .min(2, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required'),
    email: string().email('Invalid email').required('Required'),
    phoneNumber: string()
      .required('Required'),
    gender: string()
      .required('Required'),
    dob: string()
      .required('Required')
  });

  const initialValues: Partial<FormikValues> = {
    name: '',
    surname: '',
    username: '',
    email: '',
    gender: '',
    dob: '',
    phoneNumber: '',
    address: '',
    cityId: '',
    stateId: '',
    countryId: '',
  }

  return (
    <Modal
      isShowing={props.isShowing}
      title='Create account'
    >
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={values => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched, initialValues, values, resetForm, dirty, setFieldValue, setTouched }) => (
          <Form>
            <div className='space-y-6'>

              <div className='flex flex-col space-y-4'>
                <div className='flex justify-between space-x-2'>
                  <div className='flex-grow'>

                    <div className='flex flex-row space-x-2'>
                      <label htmlFor='name'><span className='text-red-600'>*</span>Name</label>
                      {(values.name === initialValues.name && !touched.name) ?
                        null :
                        (errors.name ? (
                          <div className='text-red-600'>{errors.name}</div>
                        ) :
                          <FcCheckmark />)
                      }
                    </div>
                    <Field
                      name='name'
                      placeholder={!touched.name ? 'Pedro' : ''}
                      className={`min-w-full ${(
                        values.name === initialValues.name && !touched.name
                      ) ? '' : (
                          errors.name ?
                            'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                            'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                        )} text-center shadow-sm rounded-sm h-10`}
                      style={{ outline: 'none' }}
                    />
                  </div>
                  <div className='flex-grow'>

                    <div className='flex flex-row space-x-2'>
                      <label htmlFor='surname'><span className='text-red-600'>*</span>Surname</label>
                      {(values.surname === initialValues.surname && !touched.surname) ?
                        null :
                        (errors.surname ? (
                          <div className='text-red-600'>{errors.surname}</div>
                        ) :
                          <FcCheckmark />)
                      }
                    </div>
                    <Field
                      name='surname'
                      placeholder={!touched.surname ? 'Ramirez' : ''}
                      className={`min-w-full ${(
                        values.surname === initialValues.surname && !touched.surname
                      ) ? '' : (
                          errors.surname ?
                            'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                            'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                        )} text-center shadow-sm rounded-sm h-10`}
                      style={{ outline: 'none' }}
                    />
                  </div>

                  <div className='flex-grow'>
                    <div className='flex flex-row space-x-2'>
                      <label htmlFor='dob'><span className='text-red-600'>*</span>Date of birth</label>
                      {(values.dob === initialValues.dob && !touched.dob) ?
                        null :
                        (errors.dob ? (
                          <div className='text-red-600'>{errors.dob}</div>
                        ) :
                          <FcCheckmark />)
                      }
                    </div>
                    <DatePicker allowClear format='MM/DD/YYYY'
                      onChange={(undefined, dateString) => {
                        setFieldValue('dob', dateString)
                      }}
                      onClick={() => setTouched({ ...touched, dob: true })}
                      className={`min-w-full ${(
                        values.dob === initialValues.dob && !touched.dob
                      ) ? '' : (
                          errors.dob ?
                            'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                            'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                        )} text-center shadow-sm rounded-sm h-10`}
                    />
                  </div>
                </div>

                <div className='flex flex-row justify-between space-x-2'>
                  <div>

                    <div className='flex flex-row space-x-2'>
                      <label htmlFor='username'><span className='text-red-600'>*</span>Username</label>
                      {(values.username === initialValues.username && !touched.username) ?
                        null :
                        (errors.username ? (
                          <div className='text-red-600'>{errors.username}</div>
                        ) :
                          <FcCheckmark />)
                      }
                    </div>
                    <Field
                      name='username'
                      placeholder={!touched.username ? 'p_ramirez1' : ''}
                      className={`min-w-full ${(
                        values.username === initialValues.username && !touched.username
                      ) ? '' : (
                          errors.username ?
                            'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                            'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                        )} text-center shadow-sm rounded-sm h-10`}
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
                      placeholder={!touched.email ? 'pedro@ejemplo.com' : ''}
                      className={`min-w-full ${(
                        values.email === initialValues.email && !touched.email
                      ) ? '' : (
                          errors.email ?
                            'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                            'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                        )} text-center shadow-sm rounded-sm h-10`}
                      style={{ outline: 'none' }}
                    />
                  </div>
                  <div>

                    <div className='flex flex-row space-x-2'>
                      <label htmlFor='phoneNumber'><span className='text-red-600'>*</span>Phone number</label>
                      {(values.phoneNumber === initialValues.phoneNumber && !touched.phoneNumber) ?
                        null :
                        (errors.phoneNumber ? (
                          <div className='text-red-600'>{errors.phoneNumber}</div>
                        ) :
                          <FcCheckmark />)
                      }
                    </div>
                    <Field
                      name='phoneNumber'
                      placeholder={!touched.phoneNumber ? 'xxxx-xxxx' : ''}
                      className={`min-w-full ${(
                        values.phoneNumber === initialValues.phoneNumber && !touched.phoneNumber
                      ) ? '' : (
                          errors.phoneNumber ?
                            'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                            'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                        )} text-center shadow-sm rounded-sm h-10`}
                      style={{ outline: 'none' }}
                    />

                  </div>
                  <div>
                    <div className='flex flex-row space-x-2'>
                      <label htmlFor='gender'><span className='text-red-600'>*</span>Gender</label>
                      {(values.gender === initialValues.gender && !touched.gender) ?
                        null :
                        (errors.gender ? (
                          <div className='text-red-600'>{errors.gender}</div>
                        ) :
                          <FcCheckmark />)
                      }
                    </div>
                    <Field name='gender'
                      children={({ field }) => (
                        <Select {...field} value={values.gender} isRequired
                          onChange={(v: string) => {
                            setFieldValue(field.name, v)
                          }}
                          items={genderOptions} defaultValue='Select a gender'
                          onTouch={() => setTouched({ ...touched, gender: true })}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className='flex flex-row space-x-2'>
                  <div className='flex-grow'>
                    <div className='flex flex-row space-x-2'>
                      <label htmlFor='address'>Address</label>
                      {(values.address === initialValues.address && !touched.address) ?
                        null :
                        (errors.address ? (
                          <div className='text-red-600'>{errors.address}</div>
                        ) :
                          <FcCheckmark />)
                      }
                    </div>
                    <Field
                      name='address'
                      placeholder={!touched.address ? 'Colonia Bonita, 1ra calle sur entre 7ma y 8va avenida' : ''}
                      className={`min-w-full ${(
                        values.address === initialValues.address && !touched.address
                      ) ? '' : (
                          errors.address ?
                            'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                            'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                        )} text-center shadow-sm rounded-sm h-10`}
                      style={{ outline: 'none' }}
                    />
                  </div>
                </div>

                <div className='flex flex-row space-x-2'>
                  <div className='flex-grow'>
                    <label htmlFor='countryId'>Country</label>
                    <Field name='countryId' className='min-w-full'
                      children={({ field }) => (
                        <Select {...field} value={values.countryId}
                          onChange={(v: number) => {
                            setFieldValue(field.name, v);
                            setSelectedCountry(v);
                            setFieldValue('stateId', '');
                            setFieldValue('cityId', '');
                          }}
                          items={countries ?? []} defaultValue='Select a country' label='Country'
                          onTouch={() => setTouched({ ...touched, countryId: true })}
                        />
                      )}
                    />
                  </div>
                  <div className='flex-grow'>
                    <label htmlFor='stateId'>State</label>
                    <Field name='stateId'
                      children={({ field }) => (
                        <Select {...field} disabled={!(selectedCountry > 0)} value={values.stateId}
                          onChange={(v: string) => {
                            setFieldValue(field.name, v);
                            setSelectedState(parseInt(v));
                            setFieldValue('cityId', '');
                          }}
                          items={states ?? []} defaultValue='Select a state' label='State'
                          onTouch={() => setTouched({ ...touched, stateId: true })}
                        />
                      )}
                    />
                  </div>
                  <div className='flex-grow'>
                    <label htmlFor='cityId'>City</label>
                    <Field name='cityId'
                      children={({ field }) => (
                        <Select {...field} disabled={!(selectedState > 0)} value={values.cityId}
                          onChange={(v: string) => {
                            setFieldValue(field.name, v)
                          }}
                          items={cities ?? []} defaultValue='Select a city' label='City'
                          onTouch={() => setTouched({ ...touched, cityId: true })}
                        />
                      )}
                    />
                  </div>
                </div>

              </div>
              <div className='flex justify-end rounded-b space-x-2'>
                <button
                  className='px-3 py-2 rounded-md text-md font-semibold text-coolGray-50 bg-coolGray-500 hover:bg-coolGray-600 active:bg-coolGray-900 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 active:shadow-inner'
                  type='button'
                  style={{ transition: 'all .15s ease', outline: 'none' }}
                  onClick={() => { resetForm(initialValues), setSelectedCountry(0), setSelectedState(undefined) }}
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

export default CreateAccount