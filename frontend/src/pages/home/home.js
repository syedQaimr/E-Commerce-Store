import React, { useEffect } from 'react';
import HeroSlider from '../../components/heroSlider/heroSlider';
import './home.css';
import Product from "../../components/product/Product";
import MetaData from '../../components/layout/MetaData';
import { getProducts , clearErrors} from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/loader/Loader';
import {useAlert} from "react-alert";
import ErrorPage from '../../components/frontendErrorHandler/ErrorPage'




const Home = () => {

  const alert=useAlert();
  const { loading, error, products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {

    if(error){

      if(error === "Network Error"){
        return <ErrorPage/>
    }
    else{
    alert.error(error);
    dispatch(clearErrors());
    }
    }
    dispatch(getProducts());


  }, [dispatch , error , alert])



  return (
    <>
      {
        loading ? <Loader/> : <>
          <MetaData title="Eccomerce" />
          <HeroSlider />
          <h2 className='homeHeading'>Featured Products</h2>
          <div className='container' id='container'>
            {products && products.map(product => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      }
    </>

  )
}

export default Home