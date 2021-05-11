import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({component: Component, ...rest}) => {

    const {userLogged} = useSelector(state => state.auth)

    return (
        <>
            {userLogged}
            <Route {...rest} render={props => (
            
                (userLogged?.isLogged)
                ? console.log("se logueo")
                // ? <Component {...props}/>
                : <Redirect to="/login" />
            )} />
        </>
        
    )
}