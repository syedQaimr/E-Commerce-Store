import React from 'react';
import Sidenav from '../../components/Sidenav/Sidenav';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import { makeStyles } from '@mui/styles';
import { FaShippingFast, FaCreditCard, FaHeadset } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  serviceCard: {
    padding: theme.spacing(3),
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
    height: '100%',
    transition: 'transform 0.5s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  serviceTitle: {
    fontSize: '1.8rem', // Increase the text size for service titles
    fontWeight: 'bold',
  },
  serviceDescription: {
    fontSize: '1.2rem', // Increase the text size for service descriptions
    color: theme.palette.text.secondary,
  },
  serviceIcon: {
    fontSize: '3rem',
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
}));

function AdminSettings() {
  const classes = useStyles();

  const services = [
    {
      title: 'Fast Shipping',
      description: 'Get your products quickly with our fast and reliable shipping. Our experienced couriers will ensure your packages arrive on time and in perfect condition.',
      icon: <FaShippingFast />,
    },
    {
      title: 'Secure Payments',
      description: 'Make secure transactions with our trusted payment gateways. We employ the latest encryption technologies to protect your financial information.',
      icon: <FaCreditCard />,
    },
    {
      title: '24/7 Customer Support',
      description: 'Our dedicated support team is here to assist you anytime. We are available via phone, email, and chat to answer your questions and resolve any issues you may encounter.',
      icon: <FaHeadset />,
    },
  ];


  return (
    <div className={classes.root}>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Our Services
          </Typography>
          <Grid container spacing={3}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <div className={classes.serviceCard}>
                  <IconButton className={classes.serviceIcon}>
                    {service.icon}
                  </IconButton>
                  <Typography variant="h5" className={classes.serviceTitle} gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body1" className={classes.serviceDescription}>
                    {service.description}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default AdminSettings;

