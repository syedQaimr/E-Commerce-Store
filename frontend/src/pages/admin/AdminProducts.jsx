import Sidenav from '../../components/Sidenav/Sidenav'
import { Box } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';
import ProductList from './Products/ProductList';
import '../Dash.css';


function AdminProducts() {
  return (
    <>
    
        <Navbar />
        <Box height={90} />
        <Box sx={{ display: 'flex' }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <ProductList />
          </Box>
        </Box>

    </>

  );
}

export default AdminProducts;
