import axios from 'axios'
import { useQuery } from 'react-query'
import { SEARCHED_USERS, JUST_CREATED } from '../actionTypes/users'

export const GetAllUsers = () => {
  return axios.get('http://localhost:8080/docs/users')
}

export const useUsers = () => {
	return useQuery('Users', GetAllUsers)
}

export const GetSearchedUsers = (filteredUsers) => async (dispatch) => {
  dispatch({ type: SEARCHED_USERS, payload: filteredUsers })
}

export const CreateNewUser = (data) => (dispatch) => {
  axios.post('http://localhost:8080/docs/users', { data: data })
    .then((res) => {
      if (res.status === 200) {
        dispatch(GetAllUsers())
        dispatch({ type: JUST_CREATED, payload: true })
        // dispatch({ type: CREATE_NEW_USER, payload: data })
      }
    })
    .catch((e) => {
      console.log(e)
      throw e.data
    })
}

export const GetUserByUsername = async (username) => {
	const res = await axios.get(`http://localhost:8080/docs/users/${username}/details`)
	return res
}

/* export const CreateNewUser = (userData) => (dispatch) => {
  return axios.post('http://localhost:8080/docs/users/', userData)
  .then()
  .catch((e) => {
    throw e.data

  })
  return request('http://localhost:8080/docs/users/', {
    method: 'POST',
    params,
  }).then().catch(e => {
  })
} */

/* export async function querySearchUsers(searchText?: string) {
  const data = await request(`http://localhost:8080/docs/users/find/${searchText}`)
  return { data: data }
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  })
}

export async function deleteUser(id: number) {
  return request(`http://localhost:8080/docs/users/${id}`, {
    method: 'DELETE',
  })
}

export async function updateRule(id: number, params: UsersListItemForUpdate) {
  return request(`http://localhost:8080/docs/users/${id}`, {
    method: 'PUT',
    params,
  }).then().catch(e => {
    throw e.data
  })
}

export async function queryGetCityById(id: number) {
  const data = await request(`http://localhost:8080/docs/cities/${id}`)
  return { data: data }
}

export async function queryGetStateById(id: number) {
  const data = await request(`http://localhost:8080/docs/states/${id}`)
  return { data: data }
}

export async function queryGetCountryById(id: number) {
  const data = await request(`http://localhost:8080/docs/countries/${id}`)
  return { data: data }
}

export async function queryGetCitiesByStateId(id: number) {
  const data = await request(`http://localhost:8080/docs/states/${id}/cities`)
  return { data: data }
}

export async function queryGetStatesByCountryId(id: number) {
  const data = await request(`http://localhost:8080/docs/countries/${id}/states`)
  return { data: data }
} */
