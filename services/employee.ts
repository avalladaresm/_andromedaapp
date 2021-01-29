import axios from "axios"
import { CreateEmployeeAccount } from "../models/Employee"

export const createEmployeeAccount = async (values: CreateEmployeeAccount) => {
  try {
    const res = await axios.post('http://localhost:3000/employee/createEmployeeAccount', {
      data: {
        username: values.username, password: values.password, email: values.email, emailType: values.emailType, name: values.name, surname: values.surname, gender: values.gender, dob: values.dob,
        position: values.position, hiredOn: values.hiredOn, contractType: values.contractType, salary: values.salary, employerId: values.employerId, roleId: values.roleId, 
        phoneNumber: values.phoneNumber, phoneNumberType: values.phoneNumberType, streetAddress1: values.streetAddress1, streetAddress2: values.streetAddress2,
        cityId: values.cityId, stateId: values.stateId, countryId: values.countryId, zip: values.zip, coordinates: values.coordinates
      }
    })

    return res
  } catch (e) {
    throw e
  }
}
