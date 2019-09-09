export default function reducer(state, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case 'GET_EVENTCATEGORIES':
            return {
                ...state,
                eventCategories: [...payload.categories]
            }
            case 'ADD_ERROR':
                return {
                    ...state,
                    errors: [...state.errors, payload]
                }
                case 'REMOVE_ERRORS':
                    return {
                        ...state,
                        errors: []
                    }
                    case 'LOGOUT':
                        localStorage.removeItem('TPToken');
                        return {
                            ...state,
                            token: null,
                                isAuth: false
                        }
                        case 'USER_LOGIN_SUCCESS':
                            localStorage.setItem('TPToken', payload.data.token);
                            return {
                                ...state,
                                isAuth: payload.success,
                                    token: payload.data.token,
                                    onBoard: payload.onBoard
                            }
                            default:
                                return state;
    }
}