import {
    createContext
} from 'react';


const Context = createContext({
    user: null,
    isAuth: false,
    eventCategoreis: [],
    errors: [],
    token: localStorage.getItem('TPToken'),
    onBoard: false
})

export default Context;