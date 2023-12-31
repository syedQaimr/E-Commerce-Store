import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import OrderIcon from '@mui/icons-material/ShoppingCart'
import { useNavigate } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import InventoryIcon from '@mui/icons-material/Inventory';
import '../../pages/Dash.css'


// import {useAppStore} from '../../AppStore'
import {useDispatch , useSelector} from 'react-redux';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',

    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme) ,

    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),

    }),
  }),
);

export default function Sidenav() {
  const theme = useTheme();
  // const [open, setOpen] = React.useState(true);

  const {dOpen : open} =  useSelector((state)=>state.systemSetting)
 

  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open} >
        <DrawerHeader>
          <IconButton >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem  disablePadding onClick={()=>{navigate("/admin")}}>
          <ListItemButton sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)'  } , fontSize: '1.5rem'}}>
              <ListItemIcon>
                <HomeIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ variant: 'h7' , fontSize: '1.5rem'}}
                primary="Home"
                sx={{ ml: 2 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={()=>{navigate("/admin/about")}}>
            <ListItemButton sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' } }}>
              <ListItemIcon>
                <InfoIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ variant: 'h7', sx: { fontSize: '1.5rem'} }}
                primary="About"
                sx={{ ml: 2 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={()=>{navigate("/admin/products")}}>
            <ListItemButton sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' }}}>
              <ListItemIcon>
                <LocalGroceryStoreIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ variant: 'h7',fontSize: '1.5rem' }}
                primary="Products"
                sx={{ ml: 2 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={()=>{navigate("/admin/services")}}>
            <ListItemButton sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' } }}>
              <ListItemIcon>
                <SettingsApplicationsIcon  fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ variant: 'h7',fontSize: '1.5rem' }}
                primary="Services"
                sx={{ ml: 2 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={()=>{navigate("/admin/orders")}}>
            <ListItemButton sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' , color : "black" } }}>
              <ListItemIcon >
                <OrderIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ variant: 'h7',fontSize: '1.5rem' }}
                primary="Orders"
                sx={{ ml: 2 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={()=>{navigate("/admin/users")}}>
            <ListItemButton sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' } }}>
              <ListItemIcon >
                <SupervisedUserCircleIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ variant: 'h7',fontSize: '1.5rem' }}
                primary="Users"
                sx={{ ml: 2 }}
              />
            </ListItemButton>
          </ListItem>
          <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.87)' }} />
          <ListItem disablePadding onClick={()=>{navigate("/admin/report")}}>
            <ListItemButton sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' } }}>
              <ListItemIcon >
                <AssessmentIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ variant: 'h7',fontSize: '1.5rem' }}
                primary="Sales Report"
                sx={{ ml: 2 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={()=>{navigate("/admin/orderFulfilment")}}>
            <ListItemButton sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' } }}>
              <ListItemIcon >
                <AssignmentTurnedInIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ variant: 'h7',fontSize: '1.5rem' }}
                primary="Order Delivery Report"
                sx={{ ml: 2 }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={()=>{navigate("/admin/InventoryReport")}}>
            <ListItemButton sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.05)' } }}>
              <ListItemIcon >
                <InventoryIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ variant: 'h7',fontSize: '1.5rem' }}
                primary="Inventory Report"
                sx={{ ml: 2 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
     
    </Box>
  );
}
