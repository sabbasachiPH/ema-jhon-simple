import React from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { useAuth } from "../components/Login/useAuth";

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
  };
  const auth = useAuth();

  console.log(watch("example")); // watch input value by passing the name of it

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

      <input type="submit" />
    </form>
  );
};

export default Shipment;
