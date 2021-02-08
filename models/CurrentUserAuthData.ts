import { AxiosError } from "axios";

export interface CurrentUserAuthData {
  u: string
  a_t: string
  r?: string[]
  aid?: number
  error? : AxiosError
}
