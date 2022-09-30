import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function EstimateShipping(zip) {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  useEffect(() => {}, []);

  const headers = {
    "api-key": process.env.SHIPENGINE_KEY,
    "Content-Type": "application/json",
  };

  const config = {
    headers,
    baseUrl: "https://api.shipengine.com",
    validateStatus() {
      return true;
    },
  };

  const submitHandler = async (e) => {
    let estimate = await axios.post(
      "https://api.shipengine.com/v1/estimate",
      data,
      config
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="mb-4">
          <label htmlFor="zip">Zip Code</label>
          <input
            className="w-full"
            type="zip"
            id="zip"
            {...register("zip", {
              minLength: {
                value: 5,
                message: "Enter a valid zip code",
              },
            })}
          />
          {errors.zip && (
            <div className="text-red-500 ">{errors.zip.message}</div>
          )}
        </div>
      </form>
    </div>
  );
}
