
const updateProduct = (products, product) => {
    let newProducts;
    if(products && products.length){
        newProducts = products.map((singleProduct, index) => {
            if(singleProduct.id === product.id){
                return products[index] = product
            } else {
                return products[index]
            }
        })
    }
    return newProducts;
}

export const productReducer = (state = [], action ) => {
    switch (action.type) {
        case "ADD_PRODUCT":
            return ([...state, 
                        action.payload
                    ])
                
        case "DELETE_PRODUCT":
            return(state.filter(product => product.id !== action.payload.id))
                    
        case "UPDATE_PRODUCT":
                const updated = updateProduct(state, action.payload.product)
                return updated;
                    
        case "SAVE_DATA":
            return (action.payload);
            

        default:
            return state;
    }
}