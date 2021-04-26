import React from 'react'
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


const useStyles = makeStyles((theme) => ({
    formControl: {
        width: 550,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export const AddProductButton = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();
    const [category, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

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
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    className="mb-4"
                    autoComplete="off"
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
                        value={category}
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>Food</MenuItem>
                        <MenuItem value={2}>Candy</MenuItem>
                        <MenuItem value={3}>Drink</MenuItem>
                        <MenuItem value={4}>Snack</MenuItem>
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
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Add
                </Button>
            </DialogActions>
            </Dialog>
            </div>
        </>
    )
}
