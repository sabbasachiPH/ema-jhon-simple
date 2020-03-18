import React from "react";
import "./ReviewItem.css";

const ReviewItem = props => {
  //  console.log(props);
  const { name, quantity, key, price } = props.product;

  return (
    <div className="review-item">
      <h4 className="product-name">{name}</h4>
      <p>Quantity : {quantity}</p>
      <p>Price : {price}</p>
      <button onClick={() => props.removeProduct(key)} className="main-button">
        Remove
      </button>
    </div>
  );
};

export default ReviewItem;
