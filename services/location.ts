import axios from "axios"

export const FetchCountries = () => {
  return axios.get(`${process.env.API_BASE_URL}/location/countries`)
}

export const FetchStatesByCountry = (countryId: number) => {
  return axios.get(`${process.env.API_BASE_URL}/location/country/${countryId}/states`)
}

export const FetchCitiesByState = (stateId: number) => {
  return axios.get(`${process.env.API_BASE_URL}/location/state/${stateId}/cities`)
}