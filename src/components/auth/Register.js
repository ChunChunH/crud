import React, {useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { error } from '../../redux/functions';
import {firebase} from '../../firebase'
import validator from "validator"
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const Register = ({history}) => {
    const [user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        password2:"",
    })

    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false) 
    const [errors, setErrors] = useState({
        email: false,
        name: false,
        password: false,
        password2: false,
    }) 
    const {name, email, password, password2} = user
    const dispatch = useDispatch()
    const authErrorMessage = useSelector(state => state.auth.error)
    const handleInputChange = (e) => {
        return setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }


    const firebaseFunc = () => {
    
        if (name.trim() === ""){

            dispatch(error("Name is required"))
            setOpenError(true)
            setErrors({...errors, name: true})

        }else if(password !== password2){

            dispatch(error("Passwords must be the same"))
            setOpenError(true)
            setErrors({...errors, password: true, password2: true})

        }else if(password.length < 6 ){

            dispatch(error("Password should be at least 6 characters"))
            setOpenError(true)
            setErrors({...errors, password: true, password2: true})

        }else if(!validator.isEmail(email)){

            dispatch(error("Email is not valid"))
            setOpenError(true)
            setErrors({...errors, email: true})

        }else{

            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async({user}) => {
                await user.updateProfile({displayName: name})
            })
            setOpenSuccess(true)
            setErrors({
                email: false,
                name: false,
                password: false,
                password2: false,
            })
            history.push('/login')

        }

    }
    
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpenError(false);
        setOpenSuccess(false);
    };

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const handleMouseDownPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="d-flex justify-content-center bg">
            <Card className="card mt-5 p-4 d-flex justify-content-center align-items-center">
                <CardContent>
                <Typography variant="h5" gutterBottom className="d-flex justify-content-center"> 
                    Register
                </Typography>

                
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    className="mb-4"
                    autoComplete="off"
                    onChange={handleInputChange}
                    name="name"
                    value={name}
                    required
                    error={errors.name}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    label="Email"
                    type="email"
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
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    className="mb-4"
                    autoComplete="off"
                    onChange={handleInputChange}
                    name="password"
                    value={password}
                    required
                    error={errors.password}
                    InputProps = {{
                        endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <TextField
                    autoFocus
                    margin="dense"
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    className="mb-4"
                    autoComplete="off"
                    onChange={handleInputChange}
                    name="password2"
                    value={password2}
                    required
                    error={errors.password2} 
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={firebaseFunc}
                >
                    Sign Up
                </Button>

                    <Typography color="textSecondary" gutterBottom className="d-flex justify-content-center mt-4"> 
                        Already have an account? <Link className="ms-1" to={"/login"}>Log In</Link>
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

export default Register
