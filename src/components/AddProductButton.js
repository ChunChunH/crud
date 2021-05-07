import React, { useEffect, useState } from 'react'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../redux/functions';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


const useStyles = makeStyles((theme) => ({
    formControl: {
        width: 550,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },

    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
  }));

export const AddProductButton = () => {

    // const products = useSelector(state => state.products)

    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false)    
    
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpenError(false);
        setOpenSuccess(false);
    };


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();


    const [value, setValue] = useState({
        name: "",
        category: "",
        quantity: "",
        price: "",
    })

    const {name, quantity, category, price} = value

    const handleInputChange = (e) => {
        return setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }
    
    const dispatch = useDispatch()

    

    const addDispatch = () => {

        if(name.trim() === "" || category.trim() === "" || quantity.trim() === "" || price.trim() === ""){
            setOpenError(true);
        }else {
            dispatch(add(name, quantity, category, price))
            handleClose();
            setValue({
                name: "",
                category: "",
                quantity: "",
                price: "",
            })
            // localStorage.setItem("products", JSON.stringify(products));
        }
    }



    return (
        <>
            <div>
                <button
                    className="btn btn-primary"
                    onClick={handleClickOpen}
                >
                    <FontAwesomeIcon icon={faPlus} />   Add product
                </button>
            </div>

            <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Fill in the form data to add the product
                </DialogContentText>

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
                  
                />

                <TextField
                    autoFocus
                    margin="dense"
                    label="Quantity"
                    type="number"
                    fullWidth
                    className="mb-4"
                    autoComplete="off"
                    onChange={handleInputChange}
                    name="quantity"
                    value={quantity}
                />
                
                
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label" className="mb-2">Category</InputLabel>
                    <Select
                        autoFocus
                        labelId="demo-simple-select-label"
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        className="mb-2"
                        onChange={handleInputChange}
                        value={category}
                        name="category"
                    >
                        <MenuItem value="Food">Food</MenuItem>
                        <MenuItem value="Candy">Candy</MenuItem>
                        <MenuItem value="Drink">Drink</MenuItem>
                        <MenuItem value="Snack">Snack</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    autoFocus
                    margin="dense"
                    label="Unit Price"
                    type="number"
                    fullWidth
                    className="mb-4"
                    autoComplete="off"
                    onChange={handleInputChange}
                    name="price"
                    value={price}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button
                    color="primary"
                    onClick={addDispatch}
                    
                >
                    Add
                </Button>
            </DialogActions>
            </Dialog>

        
                  <Snackbar open={openSuccess} autoHideDuration={4000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity="success">
                            Product added successfully!
                        </Alert>
                   </Snackbar>
                 <Snackbar open={openError} autoHideDuration={4000} onClose={handleCloseAlert}>
                        <Alert onClose={handleCloseAlert} severity="error">
                            You must complete the form correctly!
                        </Alert>
                  </Snackbar>
        
    
            </div>
        </>
    )
}
