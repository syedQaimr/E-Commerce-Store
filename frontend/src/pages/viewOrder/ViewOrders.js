import React, { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import { styled } from '@mui/material/styles';
import './ViewOrders.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from "react-alert";
import Loader from '../../components/loader/Loader';
import { clearErrors, myOrders } from '../../actions/orderAction'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'darkblue',
        color: theme.palette.common.white,
        fontSize: 20
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontFamily: "arial"
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(id, email, totalPrice, paymentStatus, orderStatus) {
    return { id, email, totalPrice, paymentStatus, orderStatus };
}




export default function CustomizedTables() {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const alert = useAlert();

    const { loading, error, orders } = useSelector((state) => state.myOrders);

    const rows = orders ? orders.map(order => createData(order._id, order.user.email, order.totalPrice, order.paymentInfo.paymentInfo.status , order.orderStatus)) : []



    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedRows = stableSort(rows, getComparator(order, orderBy));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(myOrders());
    }, [error, alert, dispatch])

    return (

        <>
            {
                loading ? <Loader /> :
                    <>
                        <div class="cart-title">Your Orders</div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                            <TableContainer component={Paper} sx={{ width: '90%' }}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>
                                                <TableSortLabel
                                                    active={orderBy === 'totalPrice' || orderBy === 'email' || orderBy === 'orderStatus' || orderBy === 'paymentStatus' }
                                                    direction={orderBy === 'email' ? order : 'asc'}
                                                    onClick={() => handleRequestSort('email')}
                                                    style={{ color : 'White',  marginLeft: '2%' }}
                                                >
                                                    Email

                                                </TableSortLabel>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <TableSortLabel
                                                    active={orderBy === 'totalPrice' || orderBy === 'email' || orderBy === 'orderStatus' || orderBy === 'paymentStatus' }
                                                    direction={orderBy === 'TotalPrice' ? order : 'asc'}
                                                    onClick={() => handleRequestSort('totalPrice')}
                                                    style={{ color : 'White',  marginLeft: '2%' }}
                                                >
                                                        TotalPrice
                                                </TableSortLabel>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <TableSortLabel
                                                    active={orderBy === 'totalPrice' || orderBy === 'email' || orderBy === 'orderStatus' || orderBy === 'paymentStatus' }
                                                    direction={orderBy === 'orderStatus' ? order : 'asc'}
                                                    onClick={() => handleRequestSort('orderStatus')}
                                                    style={{ color: 'White', marginLeft: '2%' }}
                                                >
                                                    PaymentStatus

                                                </TableSortLabel>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <TableSortLabel
                                                    active={orderBy === 'totalPrice' || orderBy === 'email' || orderBy === 'orderStatus' || orderBy === 'paymentStatus' }
                                                    direction={orderBy === 'paymentStatus' ? order : 'asc'}
                                                    onClick={() => handleRequestSort('paymentStatus')}
                                                    style={{ color: 'White', marginLeft: '2%' }}
                                                >
                                                                                                            OrderStatus

                                                </TableSortLabel>
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {(rowsPerPage > 0
                                            ? sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            : sortedRows
                                        ).map((row) => (
                                            <StyledTableRow key={row.id}
                                            >
                                                <StyledTableCell component="th" scope="row">
                                                    {row.email}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row">
                                                    {row.totalPrice}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row"
                                                    style={{ color : row.paymentStatus === 'succeeded' ? 'lightgreen' : 'red' }}>
                                                    {row.paymentStatus}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row"
                                                style={{ color : row.orderStatus === 'Complete' ? 'green' : 'red' }}
                                                >
                                                    {row.orderStatus}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    sx={{
                                        fontFamily: "Arial",
                                        color: 'black',
                                        fontWeight: 200,

                                        '& .MuiTablePagination-select': {
                                            fontSize: '1.8rem' // Increase font size for select dropdown
                                        },
                                        '& .MuiTablePagination-spacer': {
                                            display: 'none' // Hide the 'Spacer' element if needed
                                        }
                                        // Add more custom styles as necessary
                                    }}
                                />

                            </TableContainer>
                        </div>
                    </>
            }

        </>

    );
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

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
