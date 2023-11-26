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
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';

import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { clearErrors, getAllOrders, updateOrder } from '../../../actions/orderAction';

import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from "react-alert";
import { RestartAlt } from '@mui/icons-material';


export default function OrderList() {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { orders, error, } = useSelector((state) => state.allOrders);

  const { error: orderError, success: orderSuccess } = useSelector((state) => state.order);



  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');



  const [rows, setRows] = useState([]);


  const handleReset = () => {
    dispatch(getAllOrders())
    getData()
  };

  const getData = async () => {
    const orderData = [];

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      const {
        _id,
        orderStatus,
        taxPrice,
        totalPrice,
        user,
        itemsPrice,
      } = order;

      const rowData = {
        _id,
        orderStatus,
        taxPrice,
        totalPrice,
        user,
        itemsPrice,
      };

      orderData.push(rowData);

    }

    setRows(orderData);
  };





  const editProduct = (id, orderStatus) => {

    console.log(id, orderStatus)

    Swal.fire({
      title: 'Are You Sure',
      text: "You to change its orderStatus!",
      icon: 'warning',
      showCancelButton: 'true',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.value) {
        dispatch(updateOrder(id, orderStatus));
      }
    });

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
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
    if (orderError) {
      alert.error(orderError);
      dispatch(clearErrors())
    }
    if (orderSuccess) {
      Swal.fire('Updated!', 'Order Successfully Updated.', 'success');
      dispatch({ type: 'UPDATE_ORDER_RESET' })
    }
    dispatch(getAllOrders());
    getData()


  }, [dispatch, alert, error, orderError, orderSuccess])


  return (
    <>
      
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ padding: '20px' }}
          >
            Orders
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
                getOptionLabel={(rows) => rows.user.email || ''}
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Search Orders" />
                )}
              />

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
                    onClick={() => handleSort('email')}
                  >
                    User Email
                    {sortColumn === 'email' && (
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
                    onClick={() => handleSort('orderStatus')}
                  >
                    Order Status
                    {sortColumn === 'orderStatus' && (
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
                    onClick={() => handleSort('taxPrice')}
                  >
                    Tax Price
                    {sortColumn === 'taxPrice' && (
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
                    onClick={() => handleSort('tostalprice')}
                  >
                    Total Price
                    {sortColumn === 'tostalprice' && (
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
                    onClick={() => handleSort('itemsPrice')}
                  >
                    Items price
                    {sortColumn === 'itemsPrice' && (
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
                          {row.user.email}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ minWidth: '100px', fontSize: '13px', color: row.orderStatus === 'Delivered' ? 'green' : 'red' }}
                        >
                          {row.orderStatus}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ minWidth: '100px', fontSize: '13px' }}
                        >
                          {row.taxPrice}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ minWidth: '100px', fontSize: '13px' }}
                        >
                          {row.totalPrice}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ minWidth: '100px', fontSize: '13px' }}
                        >
                          {row.itemsPrice}
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
                                  row._id,
                                  row.orderStatus
                                )
                              }
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
          <Button
            variant="contained"
            endIcon={<RestartAlt />}
            onClick={handleReset}
            style={{ fontSize: "155%" }}
          >
            Reset
          </Button>
        </div>
      </>
  );
}
