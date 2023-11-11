import Sidenav from '../../components/Sidenav/Sidenav'
import { Box } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar';


function AdminSettings() {
  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>

        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Settings</h1>
        </Box>
      </Box>
    </>

  );
}

export default AdminSettings;
