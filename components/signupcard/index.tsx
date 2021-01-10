import React, { FC, useState } from "react"
import { LoginSettings } from "../../models/LoginSettings"
import Spin from "../Spin"
import { TempLogo } from "../TempLogo"
import { setAuth, useDoLogin } from '../../services/auth'
import { DatePicker, Form, message } from "antd"
import { useRouter } from 'next/router'
import { AxiosError } from "axios"
import { useQueryClient } from "react-query"
import { object, string, number } from 'yup'
import { Field, Formik, FormikValues } from "formik"
import { FcCheckmark } from "react-icons/fc"

interface ILogin {
  username: string
  password: string
}

export const SignupCard: FC<LoginSettings> = () => {
  const [loginData, setLoginData] = useState<ILogin>()
  const queryClient = useQueryClient()
  const doLogin = useDoLogin()
  const router = useRouter();

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
    password: string()
      .min(8, '8 characters minimum')
      .max(255, 'Woah! Will you remember that???')
      .required('Required'),
    email: string().email('Invalid email').required('Required'),
    accountTypeId: number()
      .required('Required')
  });

  const initialValues: Partial<FormikValues> = {
    name: '',
    surname: '',
    username: '',
    password: '',
    email: '',
    accountTypeId: ''
  }

  return (
    <div style={{ height: '40rem' }} className='w-96 bg-blue-100 place-self-center rounded-2xl border-solid border-blueGray-700 shadow-2xl px-5 py-5 space-y-3'>
      <div className='flex flex-col space-y-3'>
        <TempLogo className='self-center' />
        <p className='text-center font-sans font-semibold text-2xl'>
          Sign up
			</p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={values => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched, initialValues, values, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col space-y-2'>

              <div className='flex flex-col self-center w-60'>
                <div className='flex flex-row space-x-2'>
                  <label htmlFor='accountTypeId'><span className='text-red-600'>*</span>Are you a business?</label>
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
                      <Field name='accountTypeId' type='radio' value='2' />
                      Yes
                      </label>
                  </div>
                  <div>
                    <label className='cursor-pointer'>
                      <Field name='accountTypeId' type='radio' value='1' />
                       No
                       </label>
                  </div>
                </div>
              </div>

              <div className='flex flex-col self-center w-60'>
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
                    )} text-center shadow-sm rounded-sm h-8`}
                  style={{ outline: 'none' }}
                />
              </div>

              <div className='flex flex-col self-center w-60'>
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
                    )} text-center shadow-sm rounded-sm h-8`}
                  style={{ outline: 'none' }}
                />
              </div>

              <div className='flex flex-col self-center w-60'>
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
                    )} text-center shadow-sm rounded-sm h-8`}
                  style={{ outline: 'none' }}
                />

              </div>
              <div className='flex flex-col self-center w-60'>
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
                  placeholder={!touched.username ? 'pramirez_01' : ''}
                  className={`min-w-full ${(
                    values.username === initialValues.username && !touched.username
                  ) ? '' : (
                      errors.username ?
                        'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                        'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                    )} text-center shadow-sm rounded-sm h-8`}
                  style={{ outline: 'none' }}
                />
              </div>

              <div className='flex flex-col self-center w-60'>

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
                  name='password' type='password'
                  placeholder={!touched.password ? '************' : ''}
                  className={`min-w-full ${(
                    values.password === initialValues.password && !touched.password
                  ) ? '' : (
                      errors.password ?
                        'ring-2 ring-red-600 ring-inset ring-opacity-50' :
                        'focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500'
                    )} text-center shadow-sm rounded-sm h-8`}
                  style={{ outline: 'none' }}
                />
              </div>

              <div className='flex flex-col self-center w-6/12 space-y-3 pt-3'>
                {doLogin.isLoading ?
                  <button disabled type='button' className='h-8 rounded-md bg-blueGray-400 text-md font-semibold disabled:opacity-75 text-coolGray-50 flex flex-row justify-center items-center cursor-wait'>
                    <Spin /> signing up...
      						</button> :
                  <button type='submit' className='h-8 rounded-md bg-lightBlue-500 hover:bg-lightBlue-700 hover:shadow-inner shadow-md text-md font-semibold text-coolGray-50 flex flex-row justify-center items-center'>
                    Enter
			      			</button>
                }
              </div>


            </div>
          </form>
        )}

      </Formik>
      <div className='flex align-middle justify-center'>
        Already have an account? <a onClick={() => router.push('/auth/login')} className='pl-1 text-blue-800 hover:text-blue-800 hover:underline'>Login</a>
      </div>
    </div>
  )
}