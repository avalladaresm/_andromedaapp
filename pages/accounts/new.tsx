import { Field, Form, Formik, FormikState } from 'formik'
import React, { FC, useEffect, useState } from 'react'
import { ModalSettings } from '../../models/ModalSettings'
import { date, object, string } from 'yup'
import { FcCheckmark } from 'react-icons/fc';
import Select from '../../components/Select'
import { FetchCitiesByState, FetchCountries, FetchStatesByCountry } from '../../services/location'
import { number } from 'yup'
import { createBusinessAccount, createPersonAccount } from '../../services/account'
import Spin from '../../components/Spin'
import { store } from 'react-notifications-component'
import Mayre from 'mayre'
import MainContainer from '../../components/navigation'
import Error from 'next/error'
import { CurrentUserAuthData } from '../../models/CurrentUserAuthData';
import { useAuth } from '../../services/auth';
import { useQueryClient } from 'react-query';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { format, subYears } from 'date-fns';
import ReactTooltip from 'react-tooltip';
import { CreatePersonAccount } from '../../models/Account';

const NewAccount: FC<ModalSettings> = (props) => {
  const [countries, setCoutries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState<number>()
  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState<number>(undefined)
  const [cities, setCities] = useState([])
  const [accountTypeId, setAccountTypeId] = useState<string>()
  const [selectedDob, setSelectedDob] = useState<Date>();

  const queryClient = useQueryClient()

  const auth: CurrentUserAuthData = useAuth(queryClient)

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
      .max(255, 'Too Long!'),
    username: string()
      .min(2, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required'),
    email: string().email('Invalid email').required('Required'),
    phoneNumber: string()
      .required('Required'),
    gender: string(),
    dob: date()
      .max(
        subYears(new Date(), 18), selectedDob > new Date() ?
        'Dude your new employee hasn\'t even born yet? wtf??' :
        'Employee must be at least 18 years old!'
      )
      .required('Employee\'s date of birth is required!'),
    accountTypeId: number()
      .required('Required')
  });

  const initialValues: CreatePersonAccount = {
    name: '',
    surname: '',
    username: '',
    password: '',
    email: '',
    gender: '',
    dob: '',
    phoneNumber: '',
    streetAddress1: '',
    cityId: null,
    stateId: null,
    countryId: null,
    accountTypeId: null
  }

  const onChange = (e) => {
    setAccountTypeId(e.target.value)
  }

  return (
    <Mayre
      of={
        <MainContainer header='New account'>
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                values.accountTypeId = parseInt(accountTypeId)
                let res;
                if (accountTypeId === '1')
                  res = await createPersonAccount(values)
                else if (accountTypeId === '2')
                  res = await createBusinessAccount(values)
                if (res.status === 200)
                  store.addNotification({
                    message: 'Sign up success! Check your email to verify your account.',
                    type: 'success',
                    insert: 'bottom',
                    container: 'top-center',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                      duration: 5000,
                      onScreen: true
                    }
                  });
                resetForm()
              }
              catch (e) {
                store.addNotification({
                  message: `Sign up failed! ${e.response.data.message}`,
                  type: 'danger',
                  insert: 'bottom',
                  container: 'top-center',
                  animationIn: ['animate__animated', 'animate__fadeIn'],
                  animationOut: ['animate__animated', 'animate__fadeOut'],
                  dismiss: {
                    duration: 5000,
                    onScreen: true
                  }
                });
              }
            }}
          >
            {({ errors, touched, initialValues, values, resetForm, dirty, setFieldValue, setTouched, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <div className='space-y-6'>

                  <div className='flex flex-col space-y-4'>
                    <div className='flex justify-between space-x-2'>
                      <div className='flex-grow'>
                        <div className='flex flex-row space-x-2'>
                          <label htmlFor='accountTypeId'><span className='text-red-600'>*</span>Is this a business account?</label>
                          {(values.accountTypeId === initialValues.accountTypeId && !touched.accountTypeId) ?
                            null :
                            (errors.accountTypeId ? (
                              <div className='text-red-600'>{errors.accountTypeId}</div>
                            ) :
                              <FcCheckmark />)
                          }
                        </div>
                        <div className='flex space-x-3' >
                          <div>
                            <label className='cursor-pointer'>
                              <Field name='accountTypeId' type='radio' value='2' checked={accountTypeId === (2).toString()} onChange={onChange} />
                      Yes
                      </label>
                          </div>
                          <div>
                            <label className='cursor-pointer'>
                              <Field name='accountTypeId' type='radio' value='1' checked={accountTypeId === (1).toString()} onChange={onChange} />
                       No
                       </label>
                          </div>
                        </div>
                      </div>
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
                      {accountTypeId === '1' && <div className='flex-grow'>

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
                      </div>}

                      {accountTypeId === '1' && <div className='flex-grow'>
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
                        <DatePicker
                          className={`min-w-full ${(
                            values.dob === initialValues.dob && !touched.dob
                          ) ? '' : (
                              errors.dob ?
                                'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                                'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                            )} text-center shadow-sm rounded-sm h-10 px-3`}
                          selected={selectedDob}
                          dateFormat='MMMM d, yyyy'
                          onChange={(date: Date) => {
                            setSelectedDob(date);
                            setFieldValue('dob', (date && format(date, 'P')) ?? '');
                          }}
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode='select'
                          todayButton="Today"
                          placeholderText={'Enter the account holder\'s date of birth'}
                          onBlur={() => setTouched({ ...touched, dob: true })}

                        />
                      </div>}
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
                      {accountTypeId === '1' && <div>
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
                      </div>}
                    </div>

                    <div className='flex flex-row space-x-2'>
                      <div className='flex-grow'>
                        <div className='flex flex-row space-x-2'>
                          <label htmlFor='streetAddress1'>Address</label>
                          {(values.streetAddress1 === initialValues.streetAddress1 && !touched.streetAddress1) ?
                            null :
                            (errors.streetAddress1 ? (
                              <div className='text-red-600'>{errors.streetAddress1}</div>
                            ) :
                              <FcCheckmark />)
                          }
                        </div>
                        <Field
                          name='streetAddress1'
                          placeholder={!touched.streetAddress1 ? 'Colonia Bonita, 1ra calle sur entre 7ma y 8va avenida' : ''}
                          className={`min-w-full ${(
                            values.streetAddress1 === initialValues.streetAddress1 && !touched.streetAddress1
                          ) ? '' : (
                              errors.streetAddress1 ?
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
                      onClick={() => { resetForm(initialValues as Partial<FormikState<CreatePersonAccount>>), setSelectedCountry(0), setSelectedState(undefined) }}
                    >
                      Reset
                  </button>
                    <div>
                      <button
                        data-tip data-for={'cancelButton'}
                        className='px-3 py-2 rounded-md text-md font-semibold text-coolGray-50 bg-red-500 hover:bg-red-600 active:bg-red-900 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 active:shadow-inner'
                        type='button'
                        style={{ transition: 'all .15s ease', outline: 'none' }}
                        onClick={() => props.onCancel(false)}
                      >
                        Cancel
                      </button>
                      {
                        dirty &&
                        <ReactTooltip id='cancelButton'>
                          <span>Your current data will be lost.</span>
                        </ReactTooltip>
                      }
                    </div>
                    {isSubmitting ?
                      <button
                        className='px-3 py-2 rounded-md text-md font-semibold text-coolGray-50 bg-lightBlue-500 hover:bg-lightBlue-600 active:bg-lightBlue-900 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 active:shadow-inner'
                        type='submit'
                        style={{ transition: 'all .15s ease', outline: 'none' }}
                      >
                        <Spin /> Creating account...
                </button> :
                      <button
                        className='px-3 py-2 rounded-md text-md font-semibold text-coolGray-50 bg-lightBlue-500 hover:bg-lightBlue-600 active:bg-lightBlue-900 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 active:shadow-inner'
                        type='submit'
                      >
                        Save
                </button>}
                  </div>

                </div>

              </Form>
            )}
          </Formik>
        </MainContainer>
      }
      or={
        <Mayre
          of={<div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <Spin size={100} />
            </div>}
          or={<Error statusCode={404} />}
          when={!auth?.r}
        />
      }
      when={
        auth?.r.includes('SUPREME_LEADER') ||
        auth?.r.includes('PERSON_ADMIN') ||
        auth?.r.includes('BUSINESS_ADMIN')
      }
    />
  )
}

export default NewAccount