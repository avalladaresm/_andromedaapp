export interface CreateBusinessAccount {
  name:           string,
  username:       string,
  password:       string,
  email:          string,
  phoneNumber:    string,
  streetAddress1?: string,
  streetAddress2?: string,
  zip?:           string,
  coordinates?:   string,
  cityId?:        number,
  stateId?:       number,
  countryId?:     number,
  accountTypeId:  number
}
