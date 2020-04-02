import React from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { useAuth } from "../components/Login/useAuth";
import { getDatabaseCart, processOrder } from "../utilities/databaseManager";

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const auth = useAuth();
  const onSubmit = data => {
    //console.log(data);
    //TO DO: Move this section after payment
    const savedCart = getDatabaseCart();
    const orderDetails = { user: auth.user.email, cart: savedCart };
    fetch("http://localhost:4200/placeOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderDetails) // body data type must match "Content-Type" header
    })
      .then(res => res.json())
      .then(data => {
        console.log("Order Placed Successfully. Your Order id is --", data._id);
        alert("Order placed Successfully. Your Order id is --", data._id);
        processOrder();
      });
  };

  //console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ship-form">
      <input
        name="name"
        ref={register({ required: true })}
        placeholder="Name"
        defaultValue={auth.user.name}
      />
      {errors.name && <span className="error">This field is required</span>}

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

      <input name="addressline2" ref={register} placeholder="Address Line 2" />

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
      {errors.country && <span className="error">Country is required</span>}

      <input
        name="zipcode"
        ref={register({ required: true })}
        placeholder="Zip Code"
      />
      {errors.zipcode && <span className="error">Zip Code is required</span>}

      <input type="submit" value="Submit Order" />
    </form>
  );
};

export default Shipment;
