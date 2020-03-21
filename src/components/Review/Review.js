import React, { useEffect, useState } from "react";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
  processOrder
} from "../../utilities/databaseManager";
import fakeData from "../../fakeData";
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from "../Cart/Cart";
import thankyouimage from "../../images/giphy.gif";
import { Link } from "react-router-dom";
import { useAuth } from "../Login/useAuth";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const auth = useAuth();

  const handlePlaceOrder = () => {
    setCart([]);
    setOrderPlaced(true);
    processOrder();
  };

  let thankyou;
  if (orderPlaced) {
    thankyou = <img src={thankyouimage} alt="ThankyouImage" />;
  }

  const handleRemoveProduct = productkey => {
    //console.log("remove product clicked", productkey);
    const newCart = cart.filter(pd => pd.key !== productkey);
    setCart(newCart);
    removeFromDatabaseCart(productkey);
  };

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    const cartProducts = productKeys.map(key => {
      const product = fakeData.find(pd => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    });
    //console.log(cartProducts);
    setCart(cartProducts);
  }, []);
  return (
    <div className="shop-container">
      <div className="product-container">
        {cart.map(pd => (
          <ReviewItem
            key={pd.key}
            removeProduct={handleRemoveProduct}
            product={pd}
          ></ReviewItem>
        ))}
        {thankyou}
        {!cart.length && (
          <h1>
            Your Cart is Empty . <a href="/shop"> Shop here</a>
          </h1>
        )}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="shipment">
            {auth.user ? (
              <button className="main-button">Proceed For Shipment</button>
            ) : (
              <button className="main-button">LogIn To Proceed </button>
            )}
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
