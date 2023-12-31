import Sidenav from '../../components/Sidenav/Sidenav';
import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Navbar from '../../components/Navbar/Navbar';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import '../Dash.css';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccordionDash from '../../components/AccordionDash/AccordionDash';
import BarChart from '../../Charts/BarChart';
import CountUp from 'react-countup';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { adminDashboard } from '../../actions/adminAction';
import Loader from '../../components/loader/Loader'

function AdminHome() {

  const dispatch = useDispatch();
  const { data, loading  } = useSelector((state) => state.adminDashboard);


  useEffect(() => {
    dispatch(adminDashboard());

  }, [dispatch])

  return (

    <>
     <div className='begcolor'>
          <Navbar />
          <Box height={70} />
          <Box sx={{ display: 'flex' }}>
            <Sidenav />
            {
         Object.keys(data).length === 0 ? <Loader /> : 
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}> {/* Adjusted the xs value */}
                  <Stack spacing={2} direction="row">
                    <Card sx={{ width: '100%', height: 150 }} className='gradient'> {/* Adjusted maxWidth */}
                      <CardContent>
                        <div className='iconStyleWhite' >
                          <CreditCardIcon />
                        </div>
                        <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
                          ${data && 
                           <CountUp delay={0.2} end={data &&  data.totalIncom[0] && data.totalIncom[0].total } duration={1} />
                          }
                         
                        </Typography>
                        <Typography gutterBottom variant="body2" sx={{ color: "#ccd1d1" }} component="div">
                          Total Earning
                        </Typography>
                      </CardContent>
                    </Card>
                    <Card sx={{ width: '100%', height: 150 }} className='gradient-light'> {/* Adjusted maxWidth */}
                      <CardContent>
                        <div className='iconStyleWhite'>
                          <ShoppingBagIcon />
                        </div>
                        <Typography gutterBottom variant="h5" component="div" sx={{ color: "white" }}>
                          $<CountUp delay={0.5} end={ data && data.totalOrders} duration={1} />
                        </Typography>
                        <Typography gutterBottom variant="body2" sx={{ color: "#ccd1d1" }} component="div">
                          Total Order
                        </Typography>
                      </CardContent>
                    </Card>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={4}> {/* Adjusted the xs value */}
                  <Stack spacing={2}>
                    <Card sx={{ width: '100%' }} className='gradient-light , iconStyleWhite'> {/* Adjusted maxWidth */}
                      <Stack spacing={2} direction="row" >
                        <div className='iconStyle'>
                          <StorefrontIcon />
                        </div>

                        <div className='paddingall'>
                          <span className='priceTitle'>${data && data.totalProducts}</span>
                          <br />
                          <span className='priceSubTitle'>TotalProducts</span>
                        </div>
                      </Stack>
                    </Card>
                    <Card sx={{ width: '100%' }}> {/* Adjusted maxWidth */}

                      <Stack spacing={2} direction="row" >
                        <div className='iconStyle'>
                          <StorefrontIcon />
                        </div>

                        <div className='paddingall'>
                          <span className='priceTitle'>${data && data.shippableOrders}</span>
                          <br />
                          <span className='priceSubTitle'>Total Shippable Orders</span>
                        </div>
                      </Stack>

                    </Card>
                  </Stack>
                </Grid>
              </Grid>
              <Box height={20} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}> {/* Adjusted the xs value */}
                  <Card sx={{ height: '60vh' }} >
                    <CardContent> <BarChart data={data} /> </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}> {/* Adjusted the xs value */}
                  <Card sx={{ height: '60vh' }}>
                    <div className='paddingall'>
                      <span className='headingProduct'>Popular Product</span>
                    </div>
                    { 
                       <CardContent><AccordionDash topRatedProducts={data && data.topRatedProducts} /></CardContent>
                    }
                  </Card>
                </Grid>
              </Grid>
            </Box>
            }
          </Box>
               
        </div>
      

    </>
  );
}

export default AdminHome;

