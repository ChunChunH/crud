import React from "react"
import "./styles.css"
import EnhancedTable from './components/Table'
import {Provider} from 'react-redux'
import store from "./redux/store"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import { PrivateRoute } from "./PrivateRoute"
import { createBrowserHistory } from 'history'


function App() {

  const history = createBrowserHistory()

  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>

          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/> 
          <PrivateRoute component={EnhancedTable} path="/" exact />
    
        </Switch>
      </Router>
    </Provider>
    
  );
}

export default App;
