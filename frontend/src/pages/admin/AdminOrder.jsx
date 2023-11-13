import Sidenav from '../../components/Sidenav/Sidenav'
import { Box } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import '../Dash.css';
import OrderList from './Orders/OrderList';


function AdminOrders() {
  return (
    <>
    
        <Navbar />
        <Box height={90} />
        <Box sx={{ display: 'flex' }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <OrderList />
          </Box>
        </Box>

    </>

  );
}

export default AdminOrders;
