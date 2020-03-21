import React from "react";

const Cart = props => {
  const cart = props.cart;

  const formatNumber = number => {
    const convertToTwoDecimal = number.toFixed(2);
    return Number(convertToTwoDecimal);
  };

  //const totalPrice = cart.reduce((total, prd) => total + prd.price, 0);
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    totalPrice = formatNumber(totalPrice + product.price * product.quantity);
  }
  let shipping = 0;
  if (totalPrice > 35) {
    shipping = 0;
  } else if (totalPrice > 15) {
    shipping = 4.99;
  } else if (totalPrice > 0) {
    shipping = 12.99;
  }

  const vat = formatNumber(totalPrice * 0.15);
  const grandTotal = formatNumber(totalPrice + shipping + vat);

  return (
    <div>
      <h1>Order Summary</h1>
      <p>Items ordered : {cart.length}</p>
      <p>Product Price : {totalPrice}</p>
      <p>
        <small>shipping Cost :{shipping}</small>
      </p>
      <p>
        <small>Tax + Vat :{vat} </small>
      </p>
      <p>Grand Total : {grandTotal}</p>
      <br />
      {props.children}
    </div>
  );
};

export default Cart;
