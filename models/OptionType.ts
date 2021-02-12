import { number, string } from "yup/lib/locale"

export interface OptionType {
  label: string
  value: number | string
}

export interface CountryOptionType {
  label: string
  value: number
}

export interface StateOptionType {
  label: string
  value: number
}

export interface CityOptionType {
  label: string
  value: number
}