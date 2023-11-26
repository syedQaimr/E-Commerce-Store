import React from 'react';
import { Button, Typography, Container, CssBaseline } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  errorPage: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '2rem',
    borderRadius: '1rem',
    textAlign: 'center',
  },
  oops: {
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  message: {
    fontSize: '1.5rem',
    marginTop: '1rem',
  },
  retryButton: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#f44336',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default function ErrorPage(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.errorPage}>
        <Typography component="h1" variant="h5" className={classes.oops}>
          Oops!
        </Typography>
        <Typography variant="subtitle1" className={classes.message}>
          Something went wrong...
        </Typography>
        {props.resetErrorBoundary && (
          <div>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.retryButton}
              onClick={props.resetErrorBoundary}
            >
              🔄 Try Again!
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
}
