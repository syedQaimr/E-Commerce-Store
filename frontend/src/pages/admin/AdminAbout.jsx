import React from 'react';
import Sidenav from '../../components/Sidenav/Sidenav';
import { Box, Container, Typography, Paper } from '@mui/material';
import {makeStyles}  from '@mui/styles';

import Navbar from '../../components/Navbar/Navbar';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4), // Increase padding
    marginTop: theme.spacing(4), // Increase top margin
    transition: 'transform 0.3s', // Add transition effect
    color: theme.palette.text.primary, // Use a contrasting accent color
    '&:hover': {
      transform: 'scale(1.05)', // Increase size on hover
    },
  },
  heading: {
    fontSize: '3rem', // Increase font size
    fontWeight: 'bold', // Add bold weight
    marginBottom: theme.spacing(2), // Add bottom margin
    color: theme.palette.primary.dark, // Use a darker shade of blue for headings
  },
  paragraph: {
    fontSize: '1.4rem', // Increase font size
    lineHeight: 1.5, // Increase line spacing for better readability
    marginBottom: theme.spacing(2), // Add bottom margin
    color: theme.palette.text.secondary, // Use a secondary text color
  },
}));

function AdminAbout() {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h2" className={classes.heading} gutterBottom>
            About Our E-Commerce Store
          </Typography>
          <Typography variant="body1" className={classes.paragraph} paragraph>
            Welcome to our online store! We are passionate about providing high-quality products and
            an exceptional shopping experience for our customers.
          </Typography>
          <Typography variant="body1" className={classes.paragraph} paragraph>
            Our dedicated team of employees plays a crucial role in achieving our mission. Each member
            contributes to the success of our e-commerce store, ensuring that we meet the diverse needs
            of our customers.
          </Typography>
          <Typography variant="body1" className={classes.paragraph} paragraph>
            As an employee, you are an integral part of our journey. Your role is not just a job; it's a
            commitment to excellence and customer satisfaction. Whether you're working in customer service,
            logistics, technology, or any other department, your efforts contribute to the seamless and
            enjoyable shopping experience that defines our brand.
          </Typography>
          <Typography variant="body1" className={classes.paragraph} paragraph>
            At the core of our company values is a commitment to teamwork, innovation, and customer-centricity.
            We encourage open communication and collaboration among our employees to foster a positive and
            inclusive work environment.
          </Typography>
          <Typography variant="body1" className={classes.paragraph} paragraph>
            Thank you for being a part of our team. Your dedication and hard work are essential to our success.
            We value your contributions and look forward to achieving new heights together.
          </Typography>
        </Paper>
      </Container>
        </Box>
      </Box>
    </>
  );
}

export default AdminAbout;
