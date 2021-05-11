import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"
import {firebase} from '../../firebase'
import { error, isLogged, login } from '../../redux/functions';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import validator from "validator"

function Login() {
    const [user, setUser] = useState({
        email:"",
        password:"",
    })
    const {email, password} = user
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false) 
    const authErrorMessage = useSelector(state => state.auth.error)
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    }) 
    const handleInputChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const firebaseLogin = () => {
        if(password.trim() === ""){

            dispatch(error("Password is required"))
            setOpenError(true)
            setErrors({...errors, password: true})

        }else if(email.trim() === ""){

            dispatch(error("Email is required"))
            setOpenError(true)
            setErrors({...errors, email: true})

        }else if(!validator.isEmail(email)){

            dispatch(error("Email is not valid"))
            setOpenError(true)
            setErrors({...errors, email: true})

        }else {

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(async({user}) => {
                    await dispatch(login(user.displayName, user.email, user.uid))
                    setErrors({password:false , email: false})
                    dispatch(isLogged())
                })
                .catch((err) => {
                    dispatch(error(err.message))
                    setOpenError(true)
                    setErrors({password:true , email: true})
                })
        }
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpenError(false);
        setOpenSuccess(false);
    };

    return (
        <div className="d-flex justify-content-center bg">
            <Card className="card p-4 d-flex justify-content-center align-items-center">
                <CardContent>
                <Typography variant="h5" gutterBottom className="d-flex justify-content-center"> 
                    Log In
                </Typography>

                <TextField
                    autoFocus
                    margin="dense"
                    label="Email"
                    type="text"
                    fullWidth
                    className="mb-4"
                    autoComplete="off"
                    onChange={handleInputChange}
                    name="email"
                    value={email} 
                    required
                    error={errors.email}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    label="Password"
                    type="text"
                    fullWidth
                    className="mb-4"
                    autoComplete="off"
                    onChange={handleInputChange}
                    name="password"
                    value={password} 
                    required
                    error={errors.password}
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={firebaseLogin}
                >
                    Log In
                </Button>

                    <Typography color="textSecondary" gutterBottom className="d-flex justify-content-center mt-4"> 
                        You do not have an account? <Link className="ms-1" to={"/register"}>Sing Up</Link>
                    </Typography>
                </CardContent>
            </Card>

            <Snackbar open={openSuccess} autoHideDuration={4000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success">
                    User successfully registered!
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={4000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="error">
                    {authErrorMessage}
                </Alert>
            </Snackbar>                        
               
        </div>
    )
}

export default Login
