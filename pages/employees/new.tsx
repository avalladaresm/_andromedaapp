import React, { Context, useEffect, useState } from 'react';
import { useIsFetching, useQueryClient } from 'react-query';
import MainContainer from "../../components/navigation";
import Error from 'next/error'
import Mayre from 'mayre'
import { CurrentUserAuthData } from '../../models/CurrentUserAuthData';
import { useAuth } from '../../services/auth';
import { FormikValues, Formik, Form, Field, FormikState } from 'formik';
import { object, string, number, date } from 'yup';
import { FetchCountries, FetchStatesByCountry, FetchCitiesByState } from '../../services/location';
import { FcCheckmark } from 'react-icons/fc';
import Select from 'react-select'
import { CityOptionType, CountryOptionType, OptionType, StateOptionType } from '../../models/OptionType';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import { format, subDays, subYears } from 'date-fns'
import Spin from '../../components/Spin';
import { createEmployeeAccount } from '../../services/employee';
import { store } from 'react-notifications-component';
import { CreateEmployeeAccount } from '../../models/Employee';
import { FetchAccountRolesOnly } from '../../services/account';
import { documentCookieJsonify } from '../../utils/utils';
import { GetServerSidePropsContext } from 'next';
import { createActivityLog } from '../../services/activitylog';
import { useRouter } from 'next/router';
import { ActivityLogType } from '../../models/ActivityLogType';
import { usePlatformSettings } from '../../services/appsettings';

const NewEmployee = (props) => {
  const [countries, setCoutries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState<number>(undefined)
  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState<number>(undefined)
  const [cities, setCities] = useState([])
  const [selectedDob, setSelectedDob] = useState<Date>();
  const [selectedHiredOn, setSelectedHiredOn] = useState<Date>();

  const isFetching = useIsFetching()
  const queryClient = useQueryClient()

  const auth: CurrentUserAuthData = useAuth(queryClient)
  const router = useRouter()
  const platform = usePlatformSettings(queryClient)

  useEffect(() => {
    (async () => {
      await createActivityLog(auth?.a_t, auth?.u, ActivityLogType.VISITED_PAGE, router.pathname, platform)
    })()
  }, [])
  
  const genderOptions = [{
    value: 'Male', label: 'Male'
  }, {
    value: 'Female', label: 'Female'
  }, {
    value: 'Other', label: 'Other'
  }]

  const determineManagerialRoleId = (employerRole: string[]): number => {
    if (employerRole?.includes('PERSON_ADMIN'))
      return 4
    else if (employerRole?.includes('BUSINESS_ADMIN'))
      return 5
  }

  const determineEmployeeRoleId = (employerRole: string[]): number => {
    if (employerRole?.includes('PERSON_ADMIN'))
      return 6
    else if (employerRole?.includes('BUSINESS_ADMIN'))
      return 7
  }

  const employeeRoleOptions = [{
    value: determineManagerialRoleId(props?.cookies?.r), label: 'Managerial'
  }, {
    value: determineEmployeeRoleId(props?.cookies?.r), label: 'Employee'
  }]

  useEffect(() => {
    const f = async () => {
      const c = await FetchCountries()
      const items = []
      c.data.map(x => {
        items.push({ value: x.id, label: x.name })
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
        items.push({ value: x.id, label: x.name })
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
        items.push({ value: x.id, label: x.name })
      })
      setCities(items)
    }
    selectedState && f()
  }, [selectedState])

  const NewEmployeeSchema = object().shape({
    name: string()
      .min(2, 'Too Short!')
      .max(255, 'Too Long!')
      .required('Required'),
    surname: string()
      .min(2, 'Too Short!')
      .max(255, 'Too Long!')
      .required('Required'),
    gender: object()
      .required('Required!'),
    username: string()
      .min(2, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required'),
    password: string()
      .min(2, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required'),
    dob: date()
      .max(
        subYears(new Date(), 18), selectedDob > new Date() ?
        'Dude your new employee hasn\'t even born yet? wtf??' :
        'Employee must be at least 18 years old!'
      )
      .required('Employee\'s date of birth is required!'),
    position: string()
      .required('Required'),
    contractType: string()
      .required('Required'),
    salary: number()
      .required('Required'),
    roleId: object()
      .required('Requied'),
    hiredOn: date()
      .max(
        subDays(new Date(), 10), selectedHiredOn > new Date() &&
      'You can only add a new employee if starting within the next 10 days!'
      )
      .required('Employee\'s hired date is required!'),
    email: string()
      .email('Invalid email')
      .required('Required'),
    emailType: string()
      .required('Required'),
    phoneNumber: string()
      .required('Required'),
    phoneNumberType: string()
      .required('Required'),
    streetAddress1: string()
      .required('Required'),
    cityId: object()
      .required('Required'),
    stateId: object()
      .required('Required'),
    countryId: object()
      .required('Required')
  });

  const initialValues: CreateEmployeeAccount = {
    name: '',
    surname: '',
    gender: undefined,
    username: '',
    password: '',
    dob: '',
    position: '',
    contractType: '',
    salary: null,
    roleId: undefined,
    hiredOn: '',
    email: '',
    emailType: '',
    phoneNumber: '',
    phoneNumberType: '',
    streetAddress1: '',
    zip: '',
    cityId: null,
    stateId: null,
    countryId: null,
    employerId: null
  }

  return (
    <Mayre
      of={
        <MainContainer header='New employee'>
          <Formik
            initialValues={initialValues}
            validationSchema={NewEmployeeSchema}
            onSubmit={async (values, { resetForm }) => {
              console.log('v', values)
              try {
                values.employerId = auth?.aid
                values.gender = values.gender
                values.cityId = values.cityId
                values.stateId = values.stateId
                values.countryId = values.countryId
                values.roleId = values.roleId
                let res = await createEmployeeAccount(auth.a_t, values)
                if (res.status === 200)
                  store.addNotification({
                    message: 'Employee added successfully!',
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
                  message: `Error adding employee! ${e.response.data.message}`,
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
            {({ errors, touched, initialValues, values, resetForm, setFieldValue, setTouched, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <div className='flex flex-col w-full'>
                  <div className='flex flex-col p-5 2xl:w-3/5 xl:w-4/6 lg:w-5/6 justify-self-center self-center rounded-md shadow-md bg-blueGray-100'>
                    <div className='flex justify-end rounded-b space-x-2'>
                      <button
                        className='w-1/4 px-3 py-2 rounded-md text-md font-semibold text-coolGray-50 bg-coolGray-500 hover:bg-coolGray-600 active:bg-coolGray-900 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 active:shadow-inner'
                        type='button'
                        style={{ transition: 'all .15s ease', outline: 'none' }}
                        onClick={() => { resetForm(initialValues as Partial<FormikState<CreateEmployeeAccount>>), setSelectedCountry(0), setSelectedState(undefined) }}
                      >
                        Reset
                      </button>

                      {isSubmitting ?
                        <button
                          className='w-1/4 px-3 py-2 rounded-md text-md font-semibold text-coolGray-50 bg-lightBlue-500 hover:bg-lightBlue-600 active:bg-lightBlue-900 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 active:shadow-inner'
                          type='submit'
                          style={{ transition: 'all .15s ease', outline: 'none' }}
                        >
                          <Spin /> Creating employee account...
                        </button> :
                        <button
                          className='w-1/4 px-3 py-2 rounded-md text-md font-semibold text-coolGray-50 bg-lightBlue-500 hover:bg-lightBlue-600 active:bg-lightBlue-900 focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500 active:shadow-inner'
                          type='submit'
                        >
                          Save
                        </button>}
                    </div>
                    <div className='w-11/12 justify-self-center self-center border-b border-black border-solid mb-5' >
                      <p className='font-semibold text-2xl'>General info</p>
                    </div>
                    <div className='flex flex-row justify-center align-middle'>
                      <div className='p-2 mx-5 rounded-md min-w-xxs min-h-xxs bg-purple-300'>
                        propic
                      </div>
                      <div className='mx-5 justify-self-center self-center space-y-10'>
                        <div className='flex flex-row space-x-3'>
                          <div className='2xl:w-60 xl:w-48 lg:w-36 md:w-24'>
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
                          <div className='2xl:w-60 xl:w-48 lg:w-36 md:w-24 border-orange-500'>
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
                          <div className='2xl:w-60 xl:w-48 lg:w-36 md:w-24'>
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
                                <Select {...field} value={values.gender} menuPlacement='auto'
                                  onChange={(v: OptionType) => {
                                    setFieldValue(field.name, v);
                                  }}
                                  className={`min-w-full ${(
                                    values.gender === initialValues.gender && !touched.gender
                                  ) ? '' : (
                                      errors.gender ?
                                        'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                                        'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                                    )} text-center shadow-sm rounded-sm h-10`}
                                  options={genderOptions} placeholder='Select gender'
                                  onBlur={() => setTouched({ ...touched, gender: true })}
                                />
                              )}
                            />
                          </div>
                        </div>
                        <div className='flex flex-row space-x-3'>
                          <div className='2xl:w-60 xl:w-48 lg:w-36 md:w-24'>
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
                              placeholder={!touched.username ? 'Pedro' : ''}
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
                          <div className='2xl:w-60 xl:w-48 lg:w-36 md:w-24'>
                            <div className='flex flex-row space-x-2'>
                              <label htmlFor='password'><span className='text-red-600'>*</span>Password</label>
                              {(values.password === initialValues.password && !touched.password) ?
                                null :
                                (errors.password ? (
                                  <div className='text-red-600'>{errors.password}</div>
                                ) :
                                  <FcCheckmark />)
                              }
                            </div>
                            <Field
                              name='password'
                              placeholder={!touched.password ? 'Ramirez' : ''}
                              className={`min-w-full ${(
                                values.password === initialValues.password && !touched.password
                              ) ? '' : (
                                  errors.password ?
                                    'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                                    'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                                )} text-center shadow-sm rounded-sm h-10`}
                              style={{ outline: 'none' }}
                            />
                          </div>
                          <div className='2xl:w-60 xl:w-48 lg:w-36 md:w-24'>
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
                            <Field name='dob'
                              children={({ field }) => (
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
                                  placeholderText={'Enter employee\'s date of birth'}
                                  onBlur={() => setTouched({ ...touched, dob: true })}

                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='w-11/12 justify-self-center self-center border-b border-black border-solid my-10'>
                      <p className='font-semibold text-2xl'>Business related</p>
                    </div>
                    <div className='flex flex-row justify-center align-middle'>
                      <div className='flex space-x-3 justify-self-center self-center'>
                        <div className='2xl:w-52 xl:w-52 lg:w-40 md:w-28'>
                          <div className='flex flex-row space-x-2'>
                            <label htmlFor='position'><span className='text-red-600'>*</span>Position</label>
                            {(values.position === initialValues.position && !touched.position) ?
                              null :
                              (errors.position ? (
                                <div className='text-red-600'>{errors.position}</div>
                              ) :
                                <FcCheckmark />)
                            }
                          </div>
                          <Field
                            name='position'
                            placeholder={!touched.position ? 'Pedro' : ''}
                            className={`min-w-full ${(
                              values.position === initialValues.position && !touched.position
                            ) ? '' : (
                                errors.position ?
                                  'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                                  'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                              )} text-center shadow-sm rounded-sm h-10`}
                            style={{ outline: 'none' }}
                          />
                        </div>
                        <div className='2xl:w-52 xl:w-52 lg:w-40 md:w-28'>
                          <div className='flex flex-row space-x-2'>
                            <label htmlFor='contractType'><span className='text-red-600'>*</span>Contract type</label>
                            {(values.contractType === initialValues.contractType && !touched.contractType) ?
                              null :
                              (errors.contractType ? (
                                <div className='text-red-600'>{errors.contractType}</div>
                              ) :
                                <FcCheckmark />)
                            }
                          </div>
                          <Field
                            name='contractType'
                            placeholder={!touched.contractType ? 'Pedro' : ''}
                            className={`min-w-full ${(
                              values.contractType === initialValues.contractType && !touched.contractType
                            ) ? '' : (
                                errors.contractType ?
                                  'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                                  'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                              )} text-center shadow-sm rounded-sm h-10`}
                            style={{ outline: 'none' }}
                          />
                        </div>
                        <div className='2xl:w-48 xl:w-52 lg:w-40 md:w-28'>
                          <div className='flex flex-row space-x-2'>
                            <label htmlFor='salary'><span className='text-red-600'>*</span>Salary</label>
                            {(values.salary === initialValues.salary && !touched.salary) ?
                              null :
                              (errors.salary ? (
                                <div className='text-red-600'>{errors.salary}</div>
                              ) :
                                <FcCheckmark />)
                            }
                          </div>
                          <Field
                            name='salary'
                            placeholder={!touched.salary ? 'Pedro' : ''}
                            className={`min-w-full ${(
                              values.salary === initialValues.salary && !touched.salary
                            ) ? '' : (
                                errors.salary ?
                                  'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                                  'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                              )} text-center shadow-sm rounded-sm h-10`}
                            style={{ outline: 'none' }}
                          />
                        </div>
                        <div className='2xl:w-48 xl:w-52 lg:w-40 md:w-28'>
                          <div className='flex flex-row space-x-2'>
                            <label htmlFor='roleId'><span className='text-red-600'>*</span>Role</label>
                            {(values.roleId === initialValues.roleId && !touched.roleId) ?
                              null :
                              (errors.roleId ? (
                                <div className='text-red-600'>{errors.roleId}</div>
                              ) :
                                <FcCheckmark />)
                            }
                          </div>
                          <Field name='roleId'
                            children={({ field }) => (
                              <Select {...field} value={values.roleId} menuPlacement='auto'
                                onChange={(v: OptionType) => {
                                  setFieldValue(field.name, v);
                                }}
                                className={`min-w-full ${(
                                  values.roleId === initialValues.roleId && !touched.roleId
                                ) ? '' : (
                                    errors.roleId ?
                                      'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                                      'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                                  )} text-center shadow-sm rounded-sm h-10`}
                                options={employeeRoleOptions} placeholder={'Select employee\'s role'}
                                onBlur={() => setTouched({ ...touched, roleId: true })}
                              />
                            )}
                          />
                        </div>
                        <div className='2xl:w-48 xl:w-52 lg:w-40 md:w-28'>
                          <div className='flex flex-row space-x-2'>
                            <label htmlFor='hiredOn'><span className='text-red-600'>*</span>Hired on</label>
                            {(values.hiredOn === initialValues.hiredOn && !touched.hiredOn) ?
                              null :
                              (errors.hiredOn ? (
                                <div className='text-red-600'>{errors.hiredOn}</div>
                              ) :
                                <FcCheckmark />)
                            }
                          </div>
                          <Field name='hiredOn'
                            children={({ field }) => (
                              <DatePicker
                                className={`min-w-full ${(
                                  values.hiredOn === initialValues.hiredOn && !touched.hiredOn
                                ) ? '' : (
                                    errors.hiredOn ?
                                      'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                                      'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                                  )} text-center shadow-sm rounded-sm h-10 px-3`}
                                selected={selectedHiredOn}
                                dateFormat='MMMM d, yyyy'
                                onChange={(date: Date) => {
                                  setSelectedHiredOn(date);
                                  setFieldValue('hiredOn', (date && format(date, 'P')) ?? '');
                                }}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode='scroll'
                                todayButton="Today"
                                placeholderText={'Enter employee\'s hiring date'}
                                onBlur={() => setTouched({ ...touched, hiredOn: true })}

                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='w-11/12 justify-self-center self-center border-b border-black border-solid my-10'>
                      <p className='font-semibold text-2xl'>Contact</p>
                    </div>
                    <div className='flex flex-row justify-center align-middle'>
                      <div className='flex space-x-3 justify-self-center self-center'>
                        <div className='2xl:w-64 xl:w-52 lg:w-40 md:w-28'>
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
                            name='email'
                            placeholder={!touched.email ? 'Pedro' : ''}
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
                        <div className='2xl:w-64 xl:w-52 lg:w-40 md:w-28'>
                          <div className='flex flex-row space-x-2'>
                            <label htmlFor='emailType'><span className='text-red-600'>*</span>Email type</label>
                            {(values.emailType === initialValues.emailType && !touched.emailType) ?
                              null :
                              (errors.emailType ? (
                                <div className='text-red-600'>{errors.emailType}</div>
                              ) :
                                <FcCheckmark />)
                            }
                          </div>
                          <Field
                            name='emailType'
                            placeholder={!touched.emailType ? 'Pedro' : ''}
                            className={`min-w-full ${(
                              values.emailType === initialValues.emailType && !touched.emailType
                            ) ? '' : (
                                errors.emailType ?
                                  'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                                  'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                              )} text-center shadow-sm rounded-sm h-10`}
                            style={{ outline: 'none' }}
                          />
                        </div>
                        <div className='2xl:w-64 xl:w-52 lg:w-40 md:w-28'>
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
                            placeholder={!touched.phoneNumber ? 'Pedro' : ''}
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
                        <div className='2xl:w-64 xl:w-52 lg:w-40 md:w-28'>
                          <div className='flex flex-row space-x-2'>
                            <label htmlFor='phoneNumberType'><span className='text-red-600'>*</span>Phone number type</label>
                            {(values.phoneNumberType === initialValues.phoneNumberType && !touched.phoneNumberType) ?
                              null :
                              (errors.phoneNumberType ? (
                                <div className='text-red-600'>{errors.phoneNumberType}</div>
                              ) :
                                <FcCheckmark />)
                            }
                          </div>
                          <Field
                            name='phoneNumberType'
                            placeholder={!touched.phoneNumberType ? 'Pedro' : ''}
                            className={`min-w-full ${(
                              values.phoneNumberType === initialValues.phoneNumberType && !touched.phoneNumberType
                            ) ? '' : (
                                errors.phoneNumberType ?
                                  'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                                  'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                              )} text-center shadow-sm rounded-sm h-10`}
                            style={{ outline: 'none' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='w-11/12 justify-self-center self-center border-b border-black border-solid my-10'>
                      <p className='font-semibold text-2xl'>Address</p>
                    </div>
                    <div className='space-y-4'>
                      <div className='flex flex-row justify-center align-middle'>
                        <div className='flex space-x-3 justify-self-center self-center'>
                          <div className='2xl:w-144 xl:w-80 lg:w-60 md:w-40'>
                            <div className='flex flex-row space-x-2'>
                              <label htmlFor='streetAddress1'><span className='text-red-600'>*</span>Street address</label>
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
                              placeholder={!touched.streetAddress1 ? 'Pedro' : ''}
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

                          <div className='2xl:w-60 xl:w-56 lg:w-52 md:w-40'>
                            <div className='flex flex-row space-x-2'>
                              <label htmlFor='zip'>Zip</label>
                            </div>
                            <Field
                              name='zip'
                              placeholder={!touched.zip ? 'Pedro' : ''}
                              className={`min-w-full text-center shadow-sm rounded-sm h-10`}
                              style={{ outline: 'none' }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-row justify-center align-middle'>
                        <div className='flex space-x-3 justify-self-center self-center'>
                          <div className=''>
                            <div className='flex flex-row space-x-2'>
                              <div className='flex-grow 2xl:w-96 xl:w-80 lg:w-60 md:w-40'>
                                <label htmlFor='countryId'>Country</label>
                                <Field name='countryId' className='min-w-full'
                                  children={({ field }) => (
                                    <Select {...field} value={values.countryId} menuPlacement='auto'
                                      onChange={(v: CountryOptionType) => {
                                        setFieldValue(field.name, v);
                                        setSelectedCountry(v.value);
                                        setFieldValue('stateId', '');
                                        setFieldValue('cityId', '');
                                      }}
                                      options={countries ?? []} placeholder='Select a country' label='Country'
                                      onTouch={() => setTouched({ ...touched, countryId: true })}
                                    />
                                  )}
                                />
                              </div>
                              <div className='flex-grow 2xl:w-96 xl:w-80 lg:w-60 md:w-40'>
                                <label htmlFor='stateId'>State</label>
                                <Field name='stateId'
                                  children={({ field }) => (
                                    <Select {...field} isDisabled={!(selectedCountry > 0)} value={values.stateId}
                                      onChange={(v: StateOptionType) => {
                                        setFieldValue(field.name, v);
                                        setSelectedState(v.value);
                                        setFieldValue('cityId', '');
                                      }} menuPlacement='auto'
                                      options={states ?? []} placeholder='Select a state' label='State'
                                      onTouch={() => setTouched({ ...touched, stateId: true })}
                                    />
                                  )}
                                />
                              </div>
                              <div className='flex-grow 2xl:w-56 xl:w-52 lg:w-40 md:w-28'>
                                <label htmlFor='cityId'>City</label>
                                <Field name='cityId'
                                  children={({ field }) => (
                                    <Select {...field} isDisabled={!(selectedState > 0)} value={values.cityId}
                                      onChange={(v: CityOptionType) => {
                                        setFieldValue(field.name, v)
                                      }} menuPlacement='auto'
                                      options={cities ?? []} placeholder='Select a city' label='City'
                                      onTouch={() => setTouched({ ...touched, cityId: true })}
                                    />
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const parsedCookie: CurrentUserAuthData = ctx.req.headers.cookie && documentCookieJsonify(ctx.req?.headers?.cookie)
  
  if (!parsedCookie.a_t) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  const accountRoles = await FetchAccountRolesOnly(parsedCookie)

  return {
    props: {
      cookies: {
        u: parsedCookie.u,
        a_st: parsedCookie.a_t,
        r: accountRoles
      }
    }
  }
}

export default NewEmployee