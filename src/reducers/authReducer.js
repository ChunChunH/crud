const initialState = {
    error: {},
    userLogged: {},
}

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case "AUTH_ERROR":
            return {
                error: action.payload,
            }
        
        case "LOGIN_USER":
            return {
                error: {},
                userLogged: action.payload
            }
        
        default:
            return state;
    }
}