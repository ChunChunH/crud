import React from 'react'
import Button from '@material-ui/core/Button';
import "../styles.css"
import { useDispatch, useSelector } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';
import { logOut } from '../redux/functions';

export default function Header() {

    const {userLogged} = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const logOutClick = () => {
        dispatch(logOut())
    }


    return (
        <div className="header w-100 p-4 d-flex justify-content-between align-items-center">
            <h4 className="text-light d-flex align-items-center">
                <PersonIcon className="me-2"/> {userLogged.name}
            </h4>
            <Button className="text-light button-logout" onClick={logOutClick} >
                Log out
            </Button>
        </div>
    )
}
