import { IS_PAGE_CHANGING, CURRENT_LANGUAGE, IS_SIDER_COLLAPSED} from '../actionTypes/global'

export const IsPageLoading = (isPageLoading) => ( dispatch ) => {
  dispatch({ type: IS_PAGE_CHANGING, payload: isPageLoading });
}

export const SetCurrentLang = (lang) => ( dispatch ) => {
  dispatch({ type: CURRENT_LANGUAGE, payload: lang });
}

export const IsSiderCollapsed = (isSiderCollapsed) => ( dispatch ) => {
  dispatch({ type: IS_SIDER_COLLAPSED, payload: isSiderCollapsed });
}

