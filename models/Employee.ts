export interface CreateEmployeeAccount {
  name:             string
  surname:          string
  username:         string
  password:         string
  gender:           string
  dob:              string
  position:         string
  contractType:     string
  salary:           number
  hiredOn:          string
  email:            string
  emailType?:       string
  phoneNumber:      string
  phoneNumberType?: string
  streetAddress1?:  string
  streetAddress2?:  string
  zip?:             string
  coordinates?:     string
  cityId?:          number
  stateId?:         number
  countryId?:       number
  roleId:           number
  employerId:       number
}

export interface EmployeeAccountResult {
  id:                 number
  username:           string
  name:               string
  surname:            string
  gender:             string
  dob:                string
  position:           string
  contractType:       string
  salary:             number
  hiredOn:            string
  email:              string
  emailType:          string
  phoneNumber:        string
  phoneNumberType:    string
  streetAddressLine1: string
  streetAddressLine2: string
  zip:                string
  city:               string
  state:              string
  country:            string
  coordinates:        string
  isVerified:         boolean
  isActive:           boolean
  role:               number
  employerId:         number
}