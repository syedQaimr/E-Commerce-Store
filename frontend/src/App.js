import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ProductDetails from './pages/productDetails/ProductDetails';
import Products from './pages/products/Products'
import Search from './pages/search/Search';
import React from 'react';
import LoginSignUp from './pages/loginSignUp/LoginSignUp';
import Account from './pages/account/Account';
import Store from './store/store';
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import UserMenu from './components/userMenu/UserMenu';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import UpdateProfile from './pages/updateProfile/UpdateProfile';
import UpdatePassword from './pages/updatePassword/UpdatePassword';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import Cart from './pages/cart/cart';
import Shipping from './pages/shipping/Shipping';
import ConfirmOrder from './pages/confirmOrder/ConfirmOrder';
import Payment from './pages/payment/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import AdminHome from './pages/admin/AdminHome';
import AdminAbout from './pages/admin/AdminAbout';
import AdminSettings from './pages/admin/AdminSettings';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrder'
import { useState, useEffect } from 'react';

import { api } from './apies/api';
import ViewOrders from './pages/viewOrder/ViewOrders';
import AdminAllUser from './pages/admin/AdminAllUser';
import AdminReviews from './pages/admin/AdminReviews'
import SalesReport from './reports/salesReport';
import OrderFullFillmentReport from './reports/orderFullFillmentReport';
import InventoryReport from './reports/InventoryReport';

import {useAlert} from 'react-alert';
import Service from './pages/services/service';

const App = () => {

  const { darkMode } = useSelector((state) => state.systemSetting);
  const alert = useAlert();

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey() {
    try{
      const { data } = await api.get('/stripeapikey');
      console.log(data)
      setStripeApiKey(data.stripeApiKey);
    }
    catch(error){
      
    }
   
  }

  useEffect(() => {
    Store.dispatch(loadUser());
    getStripeApiKey();
  }, [])


  function FirstRoutes() {
    return (
      <BrowserRouter>

        {isAuthenticated && <UserMenu user={user} />}
        <Routes>
          <Route path='/' element={<><Header /><Home /><Footer /></>} />
          <Route path='/customer/service' element={<><Header /><Service /> <Footer /></>} />
          <Route path='/customer/product/:id' element={<><Header /><ProductDetails /><Footer /></>} />
          <Route path='/customer/products' element={<><Header /><Products /><Footer /></>} />
          <Route path='/customer/products/:keyword' element={<><Header /><Products /><Footer /></>} />
          <Route path='/customer/search' element={<><Header /><Search /><Footer /></>} />
          <Route path='/customer/login' element={<><Header /><LoginSignUp /><Footer /></>} />
          <Route path="/customer/account" element={<><Header /><ProtectedRoute> <Account /> </ProtectedRoute><Footer /></>} />
          <Route path="/customer/me/update" element={<><Header /><ProtectedRoute> <UpdateProfile /> </ProtectedRoute><Footer /></>} />
          <Route path="/customer/password/Update" element={<><Header /><ProtectedRoute> <UpdatePassword /> </ProtectedRoute><Footer /></>} />
          <Route path='/customer/cart' element={<><Header /><Cart /><Footer /></>} />
          <Route path='/customer/password/forget' element={<><Header /><ForgotPassword /><Footer /></>} />
          <Route path="/customer/shipping" element={<><Header /><ProtectedRoute> <Shipping /> </ProtectedRoute><Footer /></>} />
          <Route path="/customer/order/confirm" element={<><Header /><ProtectedRoute> <ConfirmOrder /> </ProtectedRoute><Footer /></>} />
          <Route path="/customer/orders" element={<><Header /><ProtectedRoute> <ViewOrders /> </ProtectedRoute><Footer /></>} />
          <Route path="/customer/process/payment" element={<><Header /><ProtectedRoute>
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
          </ProtectedRoute><Footer /></>} />
         
           
            <Route path='/admin' element={<><ProtectedRoute role='admin'> <ThemeProvider theme={darkTheme}> <CssBaseline /><AdminHome /> </ThemeProvider></ProtectedRoute></>} />
            <Route path='/admin/about' element={<ProtectedRoute role='admin'> <ThemeProvider theme={darkTheme}> <CssBaseline /><AdminAbout /></ThemeProvider></ProtectedRoute>} />
            <Route path='/admin/services' element={<ProtectedRoute role='admin'> <ThemeProvider theme={darkTheme}> <CssBaseline /><AdminSettings /></ThemeProvider></ProtectedRoute>} />
            <Route path='/admin/products' element={<ProtectedRoute role='admin'><ThemeProvider theme={darkTheme}> <CssBaseline /><AdminProducts /></ThemeProvider></ProtectedRoute>} />
            <Route path='/admin/orders' element={<ProtectedRoute role='admin'><ThemeProvider theme={darkTheme}> <CssBaseline /><AdminOrders /></ThemeProvider></ProtectedRoute>} />
            <Route path='/admin/users' element={<ProtectedRoute role='admin'><ThemeProvider theme={darkTheme}> <CssBaseline /><AdminAllUser /></ThemeProvider></ProtectedRoute>} />
            <Route path='/admin/reviews/:id' element={<ProtectedRoute role='admin'><ThemeProvider theme={darkTheme}> <CssBaseline /><AdminReviews /></ThemeProvider></ProtectedRoute>} />
            <Route path='/admin/report' element={<ProtectedRoute role='admin'><ThemeProvider theme={darkTheme}> <CssBaseline /><SalesReport /></ThemeProvider></ProtectedRoute>} />
            <Route path='/admin/orderFulfilment' element={<ProtectedRoute role='admin'><ThemeProvider theme={darkTheme}> <CssBaseline /><OrderFullFillmentReport /></ThemeProvider></ProtectedRoute>} />
            <Route path='/admin/InventoryReport' element={<ProtectedRoute role='admin'><ThemeProvider theme={darkTheme}> <CssBaseline /><InventoryReport /></ThemeProvider></ProtectedRoute>} />


        </Routes>

      </BrowserRouter>
    );
  }

  


  return (
    <>
    
        <FirstRoutes />
       
    </>
  )
}

export default App

