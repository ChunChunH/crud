import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


export const PrivateRoute = ({component: Component, ...rest}) => {

    const isLogged = useSelector(state => state.auth.isLogged)

    
    return (
        <>
            <Route {...rest} render={props => (
                (isLogged)
                ? <Component {...props}/>
                : <Redirect to="/login" />
            )} />
            
        </>
        
    )
}