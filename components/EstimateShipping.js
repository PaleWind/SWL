import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function EstimateShipping() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  //const { shippingCost } = state;
  const [zipcode, setZip] = useState("");
  const [shippingOptions, setShippingOptions] = useState();

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  useEffect(() => {}, []);

  const onChangeHandler = async (event) => {
    console.log("event", event.target.value);
    setZip(event.target.value);
  };

  const submitHandler = async (e) => {
    try {
      const estimate = await axios.post("/api/shipping/estimate-shipping", {
        zipcode: zipcode,
        //build data
      });
      //const {options} =
      console.log("options", shippingOptions);
      //   dispatch({
      //     type: "SAVE_CALCULATED_SHIPPING_COST",
      //     payload: estimate.shipping_amount,
      //   });
      //   Cookies.set(
      //     "cart",
      //     JSON.stringify({
      //       ...cart,
      //       paymentMethod: selectedPaymentMethod,
      //     })
      //   );
    } catch (err) {
      console.log("err from api", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="mb-4" onChange={onChangeHandler}>
          <label htmlFor="zip">Zip Code</label>
          <input
            className="w-full"
            type="text"
            id="zip"
            {...register("zip", {
              required: "Enter a valid zip code",
              minLength: {
                value: 5,
                message: "Enter a valid zip code",
              },
            })}
          />
          <div className="mb-4 ">
            <button className="primary-button">Get Shipping Options</button>
            {/* {shippingPrice ? shippingPrice : ""} */}
          </div>
          {errors.zip && (
            <div className="text-red-500 ">{errors.zip.message}</div>
          )}
        </div>
      </form>
    </div>
  );
}
