import axios from "axios"

export const FetchCountries = () => {
  return axios.get('http://localhost:3000/location/countries')
}

export const FetchStatesByCountry = (countryId: number) => {
  return axios.get(`http://localhost:3000/location/country/${countryId}/states`)
}

export const FetchCitiesByState = (stateId: number) => {
  return axios.get(`http://localhost:3000/location/state/${stateId}/cities`)
}