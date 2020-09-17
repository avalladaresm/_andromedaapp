import { GET_ALL_USERS, SEARCHED_USERS, CREATE_NEW_USER, JUST_CREATED } from '../actionTypes/users';

const initialState = {
	users: [],
	searchedUsers: { data: [], status: 'NotSearchedYet' },
	justCreated: false
};

const users = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_USERS: {
			return {
				...state,
				users: action.payload
			};
		}
		case SEARCHED_USERS: {
			return {
				...state,
				searchedUsers: action.payload
			};
		}
		case CREATE_NEW_USER: {
			return {
				...state,
				users: [...state.users, action.payload]
			};
		}
		case JUST_CREATED: {
			return {
				...state,
				justCreated: action.payload
			};
		}
		default:
			return state;
	}
};

export default users;