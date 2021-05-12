const initialState = {
    error: {},
    userLogged: {},
    isLogged: false,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTH_ERROR":
            return {
                ...state,
                error: action.payload,
            }
        
        case "LOGIN_USER":
            return {
                ...state,
                error: {},
                userLogged: action.payload
            }
        case "IS_LOGGED":
            return {...state, 
                isLogged: action.payload
            }

        case "LOG_OUT":
            return {
                ...state,
                userLogged: {},
                isLogged: action.payload
            }
            
        
        default:
            return state;
    }
}