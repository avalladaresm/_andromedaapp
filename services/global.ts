import { useMutation, useQuery } from 'react-query'
import { CURRENT_LANGUAGE, IS_SIDER_COLLAPSED } from '../actionTypes/global'

export const useIsPageLoading = () => {
	return useMutation((value) => {
		return value
	})
}

export const usePageLoading = () => {
	return useQuery('GlobalSettings')
}

export const SetCurrentLang = (lang) => (dispatch) => {
  dispatch({ type: CURRENT_LANGUAGE, payload: lang })
}

export const IsSiderCollapsed = (isSiderCollapsed) => (dispatch) => {
  dispatch({ type: IS_SIDER_COLLAPSED, payload: isSiderCollapsed })
}
