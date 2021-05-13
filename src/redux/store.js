import {createStore} from "redux"
import { productReducer } from "../reducers/productReducer"
import { combineReducers } from 'redux'
import { editProductReducer } from "../reducers/editProductReducer"
import { loadState, loadStateAuth, saveState, saveStateAuth } from "../localStorage/localStorage"
import { throttle } from "lodash-es"
import { authReducer } from "../reducers/authReducer"

const reducers = combineReducers({
    products: productReducer,
    edit: editProductReducer,
    auth: authReducer
})

const persistedState = loadState()


const store = createStore(
    reducers,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

store.subscribe(throttle(() => {
    saveState( store.getState() );

}, 1000))
    

export default store;