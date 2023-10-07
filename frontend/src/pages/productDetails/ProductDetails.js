import React from 'react'
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import {useSelector , useDispatch} from 'react-redux';
import {getProductDetails} from '../../actions/productAction';
import { useEffect } from 'react';
import {useParams} from 'react-router-dom'

function ProductDetails() {
  const dispatch = useDispatch();

  const {product , loading , error } = useSelector((state)=> state.prductDetails);
  const { id } = useParams();

  useEffect(()=>{
     dispatch(getProductDetails(id))
  },[dispatch])
  return (
    <>

       <div className='ProductDetails'>

       </div>
    </>
  )
}

export default ProductDetails