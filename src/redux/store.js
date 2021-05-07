import {createStore} from "redux"
import { productReducer } from "../reducers/productReducer"
import { combineReducers } from 'redux'
import { editProductReducer } from "../reducers/editProductReducer"
import { loadState, saveState } from "../localStorage/localStorage"
import { throttle } from "lodash-es"

const reducers = combineReducers({
    products: productReducer,
    edit: editProductReducer,
})

const persistedState = loadState()

const store = createStore(
    reducers,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    
)

store.subscribe(throttle(() => {
    saveState({
        products: store.getState().products
    });
}, 1000))
    

export default store;