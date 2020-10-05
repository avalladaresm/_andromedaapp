import axios from 'axios'
import moment from 'moment'
import { LogTypes } from '../models/LogTypes'
import { message } from 'antd'
import { queryCache, useMutation, useQueryCache } from 'react-query'
import { useQuery } from 'react-query';
import { ILog } from '../models'
import { GetUserByUsername } from './users'

export const GetUserSettings = async (username) => {
	const res = await GetUserByUsername(username)
	const settings = await axios.get(`http://localhost:8080/docs/usersettings/${res.data.id}`)
	queryCache.setQueryData('UserSettings', { language: settings.data.language, userId: settings.data.userId })
	return settings
}

export const useUserSettings = () => {
	return useQuery('UserSettings')
}

export const useUpdateLanguageSetting = () => {
	return useMutation((values) => {
		return axios.put(`http://localhost:8080/docs/usersettings/${values.userId}/update_settings`, { data: values.language })
	})
}

