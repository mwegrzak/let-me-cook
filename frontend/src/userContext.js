import {createContext} from 'react';

const userContext = createContext({isLoggedIn: false ,user: {}, toggleLogin: () => {}});

export { userContext };