import React, { useEffect, useState } from 'react'
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
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { saveProductToEdit, updatedProduct } from '../redux/functions';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: 550,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    
  }));

export const EditProduct = ({product}) => {
    const [open, setOpen] = React.useState(false);
    const state = useSelector(state => state)
    const {edit} = state

    useEffect( () => {
        if(edit.selectedProduct === null){
            setValue({
                name: "",
                category: "",
                quantity: "",
                price: "",
            })
        }else {
            setValue(edit.selectedProduct.product)
        }
    },[edit])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();
    


    const dispatch = useDispatch()

    const onClickEdit = product => {
        handleClickOpen()
        dispatch(saveProductToEdit(product))
    }


    const [value, setValue] = useState({
        name: "",
        category: "",
        quantity: "",
        price: "",
    })

    const {name, quantity, category, price} = value

    const handleInputChange = e => {
        e.preventDefault()
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
       
    }

    const onClickChange = () => {
        dispatch(saveProductToEdit(value))
        handleClose()
        dispatch(updatedProduct(value))
       
    }


    return (
        <>
            <IconButton aria-label="edit" onClick={() => onClickEdit(product)}>
                <EditIcon/>
            </IconButton>

            <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edit the data of the product
                </DialogContentText>
            
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Product name"
                                type="text"
                                fullWidth
                                className="mb-4"
                                autoComplete="off"
                                name="name"
                                value={name}
                                onChange={handleInputChange}
                            />

                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Quantity"
                                type="text"
                                fullWidth
                                className="mb-4"
                                autoComplete="off"
                                name="quantity"
                                value={quantity}
                                onChange={handleInputChange}
                            />
                
                
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label" className="mb-2">Category</InputLabel>
                                <Select
                                    autoFocus
                                    labelId="demo-simple-select-label"
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    className="mb-2"
                                    name="category" 
                                    value={category}
                                    onChange={handleInputChange}
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
                    id="name"
                    label="Price"
                    type="text"
                    fullWidth
                    className="mb-4"
                    autoComplete="off"
                    name="price"
                    value={price}
                    onChange={handleInputChange}
                />
            
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => onClickChange()} color="primary">
                    Change
                </Button>
            </DialogActions>
            </Dialog>
            </div>
        </>
    )
}

