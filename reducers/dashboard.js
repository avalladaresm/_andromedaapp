import { LATEST_USERS, IS_FETCHING_LATEST_USERS } from '../actionTypes/dashboard';

const initialState = {
	latestUsers: [],
	isFetchingLatestUsers: false
};

const dashboard = (state = initialState, action) => {
	switch (action.type) {
		case LATEST_USERS: {
			return {
				...state,
				latestUsers: action.payload.slice(action.payload.length - 5, action.payload.length)
			};
		}
		case IS_FETCHING_LATEST_USERS: {
			return {
				...state,
				isFetchingLatestUsers: action.payload
			};
		}
		default:
			return state;
	}
};

export default dashboard;