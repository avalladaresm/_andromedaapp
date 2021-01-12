export interface AccountLogIn {
  username: string
  password: string
}

export interface AccountSignUp {
  username:       string
  password:       string
  email:          string
  accountTypeId:  number
  name:           string
  surname:        string
}
