import React, { useState } from 'react'
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails, newReview , clearErrors} from '../../actions/productAction';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component"
import ReviewCard from '../../components/reviewCard/ReviewCard';
import Loader from '../../components/loader/Loader';
import { useAlert } from 'react-alert';
import { addItemsToCard } from '../../actions/cartAction';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import Rating from '@mui/material/Rating';
import {useNavigate} from 'react-router-dom'




function ProductDetails() {


  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [quantity, setQuantity] = useState(1)

  const { product, loading, error } = useSelector((state) => state.prductDetails);
  const {  success, error : reviewError } = useSelector((state) => state.newReview);



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

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");




  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    console.log(myForm)

    setOpen(false);
  };


  const addToCartHandler = () => {
    console.log("h1")
    try {
      dispatch(addItemsToCard(id, quantity));
      alert.success("Add Item To Cart")
    } catch (error) {
      alert.error("There is something wrong")

    }

  }

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if(success){
      console.log("yes");
      alert.success("Review Submitted Successfully");
      dispatch({type : 'NEW_REVIEW_RESET'});
      Navigate('/')

    }
    dispatch(getProductDetails(id));
  }, [dispatch, error, alert, id , success , reviewError , Navigate])

  return (

    <>

      {loading || product.review === undefined ? <Loader /> :
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
                    <button onClick={(e) => { if (quantity > 1) { setQuantity(quantity - 1) } }}>-</button>

                    <span> {quantity}</span>
                    <button onClick={(e) => { if (quantity < product.stock) { setQuantity(quantity + 1) } }}>+</button>
                  </div>
                  <button onClick={addToCartHandler}>Add To CART</button>
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
              <button className='submitReview' onClick={submitReviewToggle}>Submit Review</button>
            </div>
          </div>
          <h3 className='reviewsHeading'>Reviews</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle style={{ color: 'dark', fontFamily: 'Arial, sans-serif' }}>Submit Review</DialogTitle>
            <DialogContent className="submitDialog" style={{ color: 'dark', fontFamily: 'Arial, sans-serif' }}>
              {/* Your existing code */}
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ color: 'dark', fontFamily: 'Arial, sans-serif' }}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary" style={{ color: 'dark', fontFamily: 'Arial, sans-serif' }}>
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary" style={{ color: 'dark', fontFamily: 'Arial, sans-serif' }}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>

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