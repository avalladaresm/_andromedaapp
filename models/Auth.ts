import { AuthLog } from "./AuthLog";

export interface AccountLogIn {
  username: string
  password: string
  platform: AuthLog
}

export interface AccountSignUp {
  username:       string
  password:       string
  email:          string
  accountTypeId:  number
  name:           string
  surname:        string
}
