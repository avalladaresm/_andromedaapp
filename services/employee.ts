import axios, { AxiosError } from "axios"
import { QueryObserverResult, useQuery } from "react-query"
import { CreateEmployeeAccount, EmployeeAccountResult } from "../models/Employee"

export const createEmployeeAccount = async (accessToken: string, values: CreateEmployeeAccount) => {
  try {
    const res = await axios.post(`${process.env.API_BASE_URL}/employee/createEmployeeAccount`, {
      data: {
        username: values.username, password: values.password, email: values.email, emailType: values.emailType, name: values.name, surname: values.surname, gender: values.gender, dob: values.dob,
        position: values.position, hiredOn: values.hiredOn, contractType: values.contractType, salary: values.salary, employerId: values.employerId, roleId: values.roleId,
        phoneNumber: values.phoneNumber, phoneNumberType: values.phoneNumberType, streetAddress1: values.streetAddress1, streetAddress2: values.streetAddress2,
        cityId: values.cityId, stateId: values.stateId, countryId: values.countryId, zip: values.zip, coordinates: values.coordinates
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    return res
  } catch (e) {
    throw e
  }
}

const FetchEmployerEmployees = async (accessToken: string, employerId: number): Promise<EmployeeAccountResult[]> => {
  const employerEmploees = await axios.get(`${process.env.API_BASE_URL}/employee/${employerId}/getCurrentEmployerEmployees`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  return employerEmploees.data
}

export const useFetchEmployerEmployees = (accessToken: string, employerId: number): QueryObserverResult<EmployeeAccountResult[], AxiosError> => {
  return useQuery('EmployerEmployees', async () => await FetchEmployerEmployees(accessToken, employerId), { refetchOnMount: false })
}

export const getCurrentEmployerId = async (accessToken: string, employerUsername: string) => {
  try {
    const { data } = await axios.get(`${process.env.API_BASE_URL}/employee/${employerUsername}/getCurrentEmployerId`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    return data.employerId
  }
  catch (e) {
    throw e
  }
}