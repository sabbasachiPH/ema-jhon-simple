import React from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { useAuth } from "../components/Login/useAuth";
import {
  getDatabaseCart,
  clearLocalShoppingCart
} from "../utilities/databaseManager";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/checkOutForm/checkOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm();
  const [shipmentInfo, setShipmentInfo] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const auth = useAuth();

  const stripePromise = loadStripe(
    "pk_test_nvKlLrRV0UmraXsQzFsAZK2300oTkwMpBw"
  );

  const onSubmit = data => {
    setShipmentInfo(data);
    //console.log(data);
  };

  const handlePlaceOrder = payment => {
    //TO DO: Move this section after payment
    const savedCart = getDatabaseCart();
    const orderDetails = {
      user: auth.user.email,
      cart: savedCart,
      address: shipmentInfo,
      payment: payment
    };
    fetch("http://localhost:4200/placeOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderDetails) // body data type must match "Content-Type" header
    })
      .then(res => res.json())
      .then(order => {
        setOrderId(order._id);
        //TO DO-1 clear localstorage
        clearLocalShoppingCart();
        //To do-2 Thanks message to customer
        // console.log(
        //   "Order Placed Successfully. Your Order id is --",
        //   order._id
        // );
        // alert("Order placed Successfully. Your Order id is --", order._id);
        // processOrder();
      });
  };

  //console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="container">
      <div className="row">
        <div style={{ display: shipmentInfo && "none" }} className="col-md-6">
          <h3>Shipping Address</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="ship-form">
            <input
              name="name"
              ref={register({ required: true })}
              placeholder="Name"
              defaultValue={auth.user.name}
            />
            {errors.name && (
              <span className="error">This field is required</span>
            )}

            <input
              name="email"
              ref={register({ required: true })}
              placeholder="Email"
              defaultValue={auth.user.email}
            />
            {errors.email && <span className="error">Email is required</span>}

            <input
              name="addressline1"
              ref={register({ required: true })}
              placeholder="Address Line One"
            />
            {errors.addressline1 && (
              <span className="error">Address is required</span>
            )}

            <input
              name="addressline2"
              ref={register}
              placeholder="Address Line 2"
            />

            <input
              name="city"
              ref={register({ required: true })}
              placeholder="City"
            />
            {errors.city && <span className="error">City is required</span>}

            <input
              name="country"
              ref={register({ required: true })}
              placeholder="Country"
            />
            {errors.country && (
              <span className="error">Country is required</span>
            )}

            <input
              name="zipcode"
              ref={register({ required: true })}
              placeholder="Zip Code"
            />
            {errors.zipcode && (
              <span className="error">Zip Code is required</span>
            )}

            <input type="submit" value="Submit Order" />
          </form>
        </div>
        <div
          style={{
            marginTop: "200px",
            display: shipmentInfo ? "block" : "none"
          }}
          className="col-md-6"
        >
          <h3>Payment Information</h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm handlePlaceOrder={handlePlaceOrder} />
          </Elements>
          {orderId && (
            <div>
              <h3>Thank your for Shopping with us </h3>
              <p>Your Order id is {orderId}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shipment;
