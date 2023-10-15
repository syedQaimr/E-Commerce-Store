import React from 'react'
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from '../../actions/productAction';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component"
import ReviewCard from '../../components/reviewCard/ReviewCard';
import Loader from '../../components/loader/Loader';
import {useAlert} from 'react-alert';




function ProductDetails() {


  const dispatch = useDispatch();

  const { product, loading, error } = useSelector((state) => state.prductDetails);
  const { id } = useParams();

  const options = {
    edit: false,
    color: "rgb(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  }

  const alert = useAlert();

  useEffect(() => {
    if(error){
      return alert.error(error);
    }
    dispatch(getProductDetails(id));
  }, [dispatch , error ,alert , id])
 
  return (
  
    <>
    
      {loading || product.review === undefined? <Loader/> :
        <>
          <div className='ProductDetails'>
            <Carousel>
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </Carousel>

            <div>
              <div className='detailsBlock-1'>
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className='detailsBlock-2'>
                <ReactStars {...options} /> <span> {product.review.numOfReviews} Reviews</span>
              </div>
              <div className='detailsBlock-3'>
                <h1>{`₹${product.price}`}</h1>
                <div className='detailsBlock-3-1'>
                  <div className='detailsBlock-3-1-1'>
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>
                  <button>Add To CART</button>
                </div>
                <p>
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "Out Of Stock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className='detailsBlock-4'>
                Description : <p>{product.description}</p>
              </div>
              <button className='submitReview'>Submit Review</button>
            </div>
          </div>
          <h3 className='reviewsHeading'>Reviews</h3>
          {
            product.review.reviews && product.review.reviews[0] ? (
              <div className='reviews'>
                {product.review.reviews && product.review.reviews.map((rev) => <ReviewCard review={rev} />)}
              </div>
            ) : (<p className='noReviews'>No reviews</p>)}
        </>
        }
        
        
    </>
  )
}

export default ProductDetails