export interface AuthLog {
  ip:             string
  osplatform:     string
  browsername:    string
  browserversion: string
}

export interface AuthLogResult {
  id:             number
  type:           string
  createdAt:      string
  ip:             string
  osplatform:     string
  browsername:    string
  browserversion: string
  username:       string
}