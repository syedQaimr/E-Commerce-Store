import React from 'react';
import ReactStars from "react-rating-stars-component"
import { Link } from 'react-router-dom';



function Product({ product }) {
  const options={
    edit : false,
    color: "rgb(20,20,20,0.1)",
    activeColor : "tomato",
    size : window.innerWidth < 600 ? 20 :25,
    value : product.ratings,
    isHalf : true,

}

  
  try{
    return (
      <Link className='productCard' to={`/product/${product._id}`}>
          <img src={product.images[0].url} alt={product.name}/>
          <p>{product.name}</p>
          <div>
              <ReactStars {...options}/> <span>({product.review.numOfReviews} Reviews)</span>
          </div>
          <span>{`₹${product.price}`}</span>
      </Link>
    )
  }
  catch(error){
    console.log(error.message)
  }
 
  
}

export default Product