import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { AddProductModal } from './AddProductModal';
import {EditProduct} from "./EditProduct"
import { deleteProduct } from '../redux/functions';
import { Grid, TextField } from '@material-ui/core';
import Header from './Header';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }


  function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    const [filter, setFilter] = useState({
      name:"",
      quantity:"",
      category:"",
      price:""
    })
  
    const {name, quantity, category, price} = filter

    const headCells = [
      { id: 'name', numeric: false, disablePadding: true, label: 'Product Name', value: name},
      { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity', value: quantity},
      { id: 'category', numeric: true, disablePadding: false, label: 'Category', value: category },
      { id: 'price', numeric: true, disablePadding: false, label: 'Unit Price', value: price},
      { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },
    ];

    const handleInputChange = (e) => {
      setFilter({
        ...filter,
        [e.target.name]: e.target.value
      })
      console.log(filter)
    }
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            (headCell.id != "actions") ? (
              
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <div className="row">
                {/* <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  hideSortIcon={true}
                  onClick={createSortHandler(headCell.id)}
                  
                > */}
                  
                  <div>{headCell.label}</div>
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                
                
                {/* </TableSortLabel> */}

              </div>


                <div className="row px-3" id={headCell.id}>

                  {
                    headCell.id === 'category'
                    ? (
                      <Select
                        name={headCell.id}
                        value={headCell.value}
                        onChange={handleInputChange}
                        align="right"
                      >
                        <MenuItem value="Food">Food</MenuItem>
                        <MenuItem value="Candy">Candy</MenuItem>
                        <MenuItem value="Drink">Drink</MenuItem>
                        <MenuItem value="Snack">Snack</MenuItem>
                      </Select>
                    )
                    : (
                      <TextField
                        autoComplete="off"
                        type={headCell.id === 'quantity' || headCell.id === 'price' ? "number" : "text"}
                        name={headCell.id}
                        value={headCell.value}
                        onChange={handleInputChange}
                        InputProps={{ inputProps: { min: 1, max: 999999 } }}
                      />
                    )
                  }
                  
                </div>


            </TableCell>
          
            ) : ( <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              
            >
                          
                {headCell.label}
              
            </TableCell>)
            
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 80%',
    },
  }));
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      paddingLeft: '1em',
      paddingRight: '1em',
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    }
  }))
  
  export default function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('quantity');
    const [selected, setSelected] = React.useState([]);
    const [page] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage] = React.useState(5);
    const dispatch = useDispatch();
  
    const rows = useSelector(state => state.products)
    const userLogged = useSelector(state => state.auth.userLogged)
    console.log(userLogged)
    const classes2 = useToolbarStyles()
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    const [dataStorage, setDataStorage] = useState(JSON.parse(localStorage.getItem('products')))

    return (
          
              
    
                        <Toolbar
                          className={clsx(classes2.root, {
                            [classes2.highlight]: numSelected > 0,
                          })}
                        >
                          {numSelected > 0 ? (
                            <Typography className={classes2.title} color="inherit" variant="subtitle1" component="div">
                              {numSelected} selected
                            </Typography>
                          ) : (
                            <Typography className={classes2.title} variant="h6" id="tableTitle" component="div">
                              Product Listing
                            </Typography>
                          )}
                    
                              <IconButton>
                                <Button
                                  onClick={handleClickOpen}
                                  variant="contained"
                                  color="primary"
                                  className="d-flex alig-items-center"
                                  startIcon={<AddIcon />}
                                >
                                  Add product
                                </Button>
                              </IconButton>
                        </Toolbar>
          
          
        );
      };
      
      EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
      };

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.name);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
  

    const isSelected = (name) => selected.indexOf(name) !== -1;
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
  return (
    <>
      <Header/>

      <div className="table w-1">
        <EnhancedTableToolbar numSelected={selected.length} />
        <Paper className={classes.paper}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >

              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              
              

              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((product) => product.uid === userLogged.uid)
                  .map((row, index) => {
                  
                    const labelId = `enhanced-table-checkbox-${index}`;
                  
                    return (
                      <>
                      <TableRow className="ms-5">
                        
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        
                        <TableCell align="right">{row.category}</TableCell>
                        <TableCell align="right">{`$${row.price}`}</TableCell>
                        
                        <TableCell align="right">
                          <Grid container className="justify-content-end">
                            <Tooltip title="Edit" >
                              <EditProduct
                                product={row}
                              />
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton aria-label="delete"  onClick={() => dispatch(deleteProduct(row.id))}>
                                  <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                          </Grid>
                        </TableCell>

                      </TableRow>

                      {/* <TableRow className="ms-5">

                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          nombre
                        </TableCell>
                        <TableCell align="right">quant</TableCell>
                        <TableCell align="right">category</TableCell>
                        <TableCell align="right">price</TableCell>

                      </TableRow> */}
                      </>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
        </Paper>

        <AddProductModal
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
        />
      </div>
      </>
      
    );
  }


