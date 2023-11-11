import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { Divider } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Modal from '@mui/material/Modal';
import AddForm from './AddProduct';
import EditForm from './EditProduct';
import {  clearErrors, getProductsAdmin , deleteProduct } from '../../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from "react-alert";


export default function ProductList() {

  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  const {  error : deleteError, success : deleteSuccess } = useSelector((state) => state.deleteProduct);


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
     setOpen(false) 
     dispatch(getProductsAdmin())
  };

  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const [rows, setRows] = useState([]);

  const [formid, setformid] = useState('');



  const getData = async () => {
    const productData = [];
    console.log(products.length);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const {
        _id,
        name,
        price,
        category,
        images,
        stock,
        ratings,
        description
      } = product;

      const rowData = {
        id: _id,
        name,
        price,
        category,
        images,
        stock,
        description,
        ratings
      };

      productData.push(rowData);

    }

    setRows(productData);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const deleteProductHandler = (id) => {
    console.log(id)
    Swal.fire({
      title: 'Are You Sure',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: 'true',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
        dispatch(deleteProduct(id))
      }
    });
  };


  const editProduct = (id, name, price, category) => {
    const data = {
      id,
      name,
      price,
      category,
    };

    setformid(data);
    handleEditOpen();
  };

  const filterData = (v) => {
    if (v) {
      setRows([v]);
    } else {
      getData();
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedRows = () => {
    if (sortColumn) {
      return rows.slice().sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (sortDirection === 'asc') {
          return aValue < bValue ? -1 : 1;
        } else {
          return aValue > bValue ? -1 : 1;
        }
      });
    }
    return rows;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  
  useEffect(() => {
  
    dispatch(getProductsAdmin());
    getData();

  }, [])

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
    if(deleteError){
      alert.error(error);
      dispatch(clearErrors())
    }
    if(deleteSuccess){
      Swal.fire('Deleted!', 'Product Successfully Deleted.', 'success');
      dispatch({type : 'DELETE_PRODUCT_RESET'})
    }
    dispatch(getProductsAdmin());
    

  }, [dispatch, alert, error , deleteSuccess , deleteError])


  return (
    <>
      <Modal
        open={editOpen}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EditForm closeEvent={handleEditClose} fid={formid} />
        </Box>
      </Modal>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddForm closeEvent={handleClose} />
        </Box>
      </Modal>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: '20px' }}
        >
          ProductList
        </Typography>
        <Divider style={{ marginBottom: '10px' }} />
        <Box height={50}>
          <Stack direction="row" spacing={2} className="my-2 mb-2">
            <Autocomplete
              disablePortal
              id="como-box-demo"
              options={rows}
              sx={{ width: 300 }}
              onChange={(e, v) => filterData(v)}
              getOptionLabel={(rows) => rows.name || ''}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Search Products" />
              )}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
            <Button
              variant="contained"
              endIcon={<AddCircleIcon />}
              onClick={handleOpen}
              style={{fontSize:"155%"}}
            >
              Add
            </Button>
          </Stack>
        </Box>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{
                    minWidth: '100px',
                    color: 'white',
                    backgroundColor: 'black',
                    fontSize: '15px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleSort('name')}
                >
                  Name
                  {sortColumn === 'name' && (
                    <span>{sortDirection === 'asc' ? ' ▼' : ' ▲'}</span>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: '100px',
                    color: 'white',
                    backgroundColor: 'black',
                    fontSize: '15px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleSort('price')}
                >
                  Price
                  {sortColumn === 'price' && (
                    <span>{sortDirection === 'asc' ? ' ▼' : ' ▲'}</span>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: '100px',
                    color: 'white',
                    backgroundColor: 'black',
                    fontSize: '15px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleSort('category')}
                >
                  Category
                  {sortColumn === 'category' && (
                    <span>{sortDirection === 'asc' ? ' ▼' : ' ▲'}</span>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: '100px',
                    color: 'white',
                    backgroundColor: 'black',
                    fontSize: '15px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleSort('stock')}
                >
                  Stock
                  {sortColumn === 'stock' && (
                    <span>{sortDirection === 'asc' ? ' ▼' : ' ▲'}</span>
                  )}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    minWidth: '100px',
                    color: 'white',
                    backgroundColor: 'black',
                    fontSize: '15px',
                  }}
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRows()
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell
                        align="center"
                        style={{ minWidth: '100px', fontSize: '13px' }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ minWidth: '100px', fontSize: '13px' }}
                      >
                        {row.price}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ minWidth: '100px', fontSize: '13px' }}
                      >
                        {row.category}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ minWidth: '100px', fontSize: '13px' }}
                      >
                        {row.stock}
                      </TableCell>
                      <TableCell style={{ minWidth: '100px', fontSize: '13px' }}>
                        <Stack
                          spacing={4}
                          direction="row"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <EditIcon
                            style={{
                              fontSize: '145%',
                              color: 'blue',
                              cursor: 'pointer',
                            }}
                            onClick={() =>
                              editProduct(
                                row.id,
                                row.name,
                                row.price,
                                row.category
                              )
                            }
                          />
                          <DeleteIcon
                            style={{
                              fontSize: '145%',
                              color: 'darkred',
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              deleteProductHandler(row.id);
                            }}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
