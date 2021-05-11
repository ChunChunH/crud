import { v4 as uuidv4 } from 'uuid';

export const add = (name, quantity, category, price) => ({
    type: "ADD_PRODUCT",
    payload: {
        name,
        quantity,
        category,
        price,
        id: uuidv4()
    }
})


export const deleteProduct = (id) => ({
    type: "DELETE_PRODUCT",
    payload: {
        id
    }
})

export const saveProductToEdit = (product) => ({
    type: "SAVE_PRODUCT",
    payload: {
        product
    }
})

export const updatedProduct = (product) => ({
    type: "UPDATE_PRODUCT",
    payload: {
        product
    }
})

export const initialStateStorage = (dataStorage) => ({
    type: "SAVE_DATA",
    payload: dataStorage
})


export const error = (errorMessage) => {
    return {
        type: "AUTH_ERROR",
        payload: errorMessage
        
    }
}

export const login = (name, email, uid) => {
    return {
        type: "LOGIN_USER",
        payload: {
            name: name,
            email: email,
            uid: uid,
        }
    }
}


export const isLogged = () => {
    return {
        type: "IS_LOGGED",
        payload: {
            isLogged: false
        }
    }
}
    