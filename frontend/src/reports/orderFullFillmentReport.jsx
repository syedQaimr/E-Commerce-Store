
import React, { useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import { Container, Row, Col, Table } from 'react-bootstrap';

import './Report.css'; // Import the external CSS file

import Sidenav from '../components/Sidenav/Sidenav'
import { Box } from '@mui/material';
import Navbar from '../components/Navbar/Navbar';
import '../pages/Dash.css';
import { useSelector, useDispatch } from "react-redux"
import { getOrderFullFillmentReport, clearErrors } from "../actions/reportAction";
import { useAlert } from "react-alert";
import  Loader  from '../components/loader/Loader'



export default function OrderFullFillmentReport() {
    let componentRef = useRef();


    return (
        <>
            <Navbar />
            <Box height={90} />
            <Box sx={{ display: 'flex' }}>
                <Sidenav />
                <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
                    <div >
                        <ReactToPrint
                            trigger={() => <Button style={{
                                background: 'darkBlue',
                                border: '2px solid #ccc',
                                borderRadius: '12px',
                                padding: '10px 20px',
                                cursor: 'pointer',
                                transition: 'all .2s ease-in-out',
                                '&:hover': {
                                    background: 'black',
                                },
                            }} >Print this out!</Button>}
                            content={() => componentRef}
                        />

                        <OrderFullFilmentReportPage ref={(el) => (componentRef = el)} />

                    </div>
                </Box>
            </Box>
        </>
    );
}



const OrderFullFilmentReportPage = React.forwardRef((props, ref) => {
    const { user } = useSelector((state) => state.user);
    const { report: orderFulfillmentReportData, loading, error } = useSelector((state) => state.report);

    const alert = useAlert();
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(getOrderFullFillmentReport());


    }, [dispatch, alert, error])




  
   

    return (
        <> {loading? <Loader /> :
            <div ref={ref} style={{ marginTop: '2%' }} >
                <div className="container mt-4">
                    <h1 className="display-3 text-center text-uppercase font-weight-bold">
                        Order Fulfillment Report
                    </h1>
                    <div className="container mt-2">
                        <p className="display-7 text-center text-uppercase font-weight-bold">
                            By Eccomerce
                        </p>
                    </div>
                </div>


                <div className="mt-5" style={{ marginTop: '10%', marginLeft: "10%", marginRight: "10%", padding: "2%" }}>
                    <Row>
                        <Col xs={12} md={6}>
                            <p className="sales-info text-uppercase" style={{ fontSize: '14px', fontWeight: 'bold', fontStyle: 'Arial', color: 'black' }}>
                                Total Delivered: ${ orderFulfillmentReportData && orderFulfillmentReportData.orderStatusCount && orderFulfillmentReportData.orderStatusCount.Delivered}
                            </p>
                        </Col>
                        <Col xs={12} md={6} className="text-end">
                            <p className="sales-info text-uppercase" style={{ fontSize: '14px', fontWeight: 'bold', fontStyle: 'Arial', color: 'grey' }}>
                                Date: {new Date().toLocaleDateString()}
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <p className="sales-info text-uppercase" style={{ fontSize: '14px', fontStyle: 'Arial', color: 'black' }}>
                            Average Processing Time: {orderFulfillmentReportData.averageProcessingTime}
                            </p>
                        </Col>
                    </Row> <Row>
                        <Col xs={12} md={6}>
                            <p className="sales-info text-uppercase" style={{ fontSize: '14px', fontStyle: 'Arial', color: 'black' }}>
                            Order Fulfillment Efficiency: {orderFulfillmentReportData.orderFulfillmentEfficiency}
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <p className="sales-info text-uppercase" style={{ fontSize: '14px', fontStyle: 'Arial', color: 'black' }}>
                                Generated By: {user.name}
                            </p>
                        </Col>
                    </Row>
                </div>
                <div style={{ marginLeft: "10%", marginRight: "10%", padding: "2%" }}>
                    <Row >
                        <Col xs={12}>
                            <Table striped bordered hover responsive style={{ background: "#001f3f", color: "white", border: "1px solid #001f3f", fontSize: "16px" }}>
                                <thead >
                                    <tr >
                                        <th style={{ background: "blue", color: "white", textAlign: 'center' }}>Order Status</th>
                                        <th style={{ background: "blue", color: "white", textAlign: 'center' }}>Total Price</th>
                                        <th style={{ background: "blue", color: "white", textAlign: 'center' }}>Processing Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderFulfillmentReportData && orderFulfillmentReportData.orderDetails && orderFulfillmentReportData.orderDetails.map((orderDetail, index) => (
                                        <tr key={index}>
                                            <td style={{ textAlign: 'center' }}>{orderDetail.orderStatus}</td>
                                            <td style={{ textAlign: 'center' }}>{orderDetail.orderTotalPrice}</td>
                                            <td style={{ textAlign: 'center' }}>{orderDetail.processingTime}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>


            </div>
            }</>


    );
});

