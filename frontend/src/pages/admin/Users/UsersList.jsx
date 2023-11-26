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
import DeleteIcon from '@mui/icons-material/DeleteSweep';

import Swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { clearErrors, deleteUser, getAllUsers } from '../../../actions/userAction';

import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from "react-alert";
import { RestartAlt } from '@mui/icons-material';
import { DELETE_USER_RESET } from '../../../constants/userContant';



export default function UsersList() {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { users, error, } = useSelector((state) => state.allUsers);

    const { error: deleteError, isDeleted: deleteSuccess } = useSelector((state) => state.deleteUser);





    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');



    const [rows, setRows] = useState([]);


    const handleReset = () => {
        dispatch(getAllUsers())
        getData()
    };

    const getData = async () => {
        const userData = [];

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const {
                _id,
                name,
                email,
                role,
                avatar,
                Active
            } = user;

            const rowData = {
                _id,
                name,
                email,
                role,
                avatar,
                Active
            };


            userData.push(rowData);

        }

        setRows(userData);
    };



    const deleteUserHandler = (id) => {
        console.log(id)
        Swal.fire({
            title: 'Are You Sure',
            text: "You Changes Effect Customers!",
            icon: 'warning',
            showCancelButton: 'true',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update Status!',
        }).then((result) => {
            if (result.value) {
                dispatch(deleteUser(id))
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
        if (deleteError) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if (deleteSuccess) {
            Swal.fire('Updated!', 'User Updated Successfully', 'success');
            dispatch({type : DELETE_USER_RESET})
        }


        dispatch(getAllUsers());


    }, [dispatch, alert, error , deleteError , deleteSuccess])


    return (
        <>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ padding: '20px' }}
                >
                    Users
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
                                <TextField {...params} size="small" label="Search Users" />
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
                                >
                                    Avatar
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
                                    onClick={() => handleSort('email')}
                                >
                                    Email
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
                                    onClick={() => handleSort('role')}
                                >
                                    Role
                                    {sortColumn === 'role' && (
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
                                >
                                    Active
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
                                            <TableCell align="center" style={{ minWidth: '100px', fontSize: '13px' }}>
                                                <div
                                                    style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        borderRadius: '50%',
                                                        overflow: 'hidden',
                                                        margin: 'auto',
                                                    }}
                                                >
                                                    <img
                                                        src={row.avatar}
                                                        alt={row.name}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{ minWidth: '100px', fontSize: '13px' }}
                                            >
                                                {row.email}
                                            </TableCell>

                                            <TableCell
                                                align="center"
                                                style={{ minWidth: '100px', fontSize: '13px' }}
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{ minWidth: '100px', fontSize: '13px', color: row.role === 'admin' ? 'red' : 'green' }}
                                            >
                                                {row.role}
                                            </TableCell>

                                            <TableCell
                                                align="center"
                                                style={{ minWidth: '100px', fontSize: '13px', color: row.Active === true ? 'green' : 'red' }}
                                            >
                                                {row.Active ? "Active" : "InActive" }
                                            </TableCell>

                                            <TableCell style={{ minWidth: '100px', fontSize: '13px' }}>
                                                <Stack
                                                    spacing={4}
                                                    direction="row"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <DeleteIcon
                                                        style={{
                                                            fontSize: '145%',
                                                            color: 'blue',
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() => {deleteUserHandler(row._id)}
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
