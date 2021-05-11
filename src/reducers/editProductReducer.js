
const initialState = {
    selectedProduct: null
}

export const editProductReducer = (state = initialState, action ) => {
    switch (action.type) {

        case "SAVE_PRODUCT":
            return {...state, 
                    selectedProduct: action.payload
                }

            
        default:
            return state;
    }
}