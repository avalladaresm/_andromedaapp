import { IS_PAGE_CHANGING, CURRENT_LANGUAGE, IS_SIDER_COLLAPSED } from '../actionTypes/global'

const initialState = {
  isPageLoading: false,
  currentLanguage: 'en',
  isSiderCollapsed: false
}

const logs = (state = initialState, action) => {
  switch (action.type) {
    case IS_PAGE_CHANGING: {
      return {
        ...state,
        isPageLoading: action.payload
      }
    }
    case CURRENT_LANGUAGE: {
      return {
        ...state,
        currentLanguage: action.payload
      }
    }
    case IS_SIDER_COLLAPSED: {
      return {
        ...state,
        isSiderCollapsed: action.payload
      }
    }
    default:
      return state
  }
}

export default logs
