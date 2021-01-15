import { createContext } from 'react';

const UserContext = createContext({currentUser: undefined, currentUserRole: undefined});

export default UserContext;