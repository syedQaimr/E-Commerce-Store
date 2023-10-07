import React, { useEffect } from 'react';
import HeroSlider from '../../components/heroSlider/heroSlider';
import './home.css';
import Product from "../../components/product/Product";
import MetaData from '../../components/layout/MetaData';
import { getProducts } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/loader/Loader';
import {useAlert} from "react-alert"



const Home = () => {

  const alert=useAlert();
  const { loading, error, products, productCount } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {

    if(error){
      
      return alert.error(error)
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
              <Product product={product} />
            ))}
          </div>
        </>
      }
    </>

  )
}

export default Home