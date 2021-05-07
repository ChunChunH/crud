
export const loadState = () => {
    try {
        console.log("funciona")
        const serializedState = localStorage.getItem("products")

        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState)
        
    } catch(err) {  
        return undefined;
    }
}


export const saveState = state => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem("products", serializedState)
    } catch (err) {
        
    }
}