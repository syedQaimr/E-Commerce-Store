import ReactStars from "react-rating-stars-component"
import React from "react";
import profile from '../../images/profile.png'

const ReviewCard = ({ review }) => {
    const options = {
        edit: false,
        color: "rgb(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true,
      
      }

  return (
    <div className="reviewCard">
      <img src={profile} alt="User"/>
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};
export default ReviewCard