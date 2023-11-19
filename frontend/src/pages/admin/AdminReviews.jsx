import Sidenav from '../../components/Sidenav/Sidenav'
import { Box } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import ReviewList from './Reviews/ReviewList';
import '../Dash.css';


function AdminReviews() {
  return (
    <>
    
        <Navbar />
        <Box height={90} />
        <Box sx={{ display: 'flex' }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <ReviewList />
          </Box>
        </Box>

    </>

  );
}

export default AdminReviews;