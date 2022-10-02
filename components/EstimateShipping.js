import React, { useContext, useEffect, useState, Fragment } from "react";
import { Store } from "../utils/Store";
import axios from "axios";
import { useForm } from "react-hook-form";
import { RadioGroup } from "@headlessui/react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function EstimateShipping() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: {
      cartItems,
      shippingAddress,
      shippingEstimates,
      selectedShippingEstimate,
      shippingMethod,
    },
  } = state;
  //const { shippingCost } = state;
  const [zipcode, setZip] = useState(shippingAddress?.postalCode ?? "");
  const [selectedShippingOption, setSelectedShippingOption] = useState(
    selectedShippingEstimate
  );

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  useEffect(() => {}, [shippingEstimates]);

  const onChangeHandler = async (event) => {
    setZip(event.target.value);
  };

  const setSelectedShippingMethod = async (event) => {
    setSelectedShippingOption(event);
    dispatch({
      type: "SAVE_SELECTED_SHIPPING_COST",
      payload: event.shipping_amount.amount,
    });
    dispatch({
      type: "SAVE_SELECTED_SHIPPING_ESTIMATE",
      payload: event,
    });
  };

  const submitHandler = async (e) => {
    try {
      dispatch({
        type: "SAVE_SHIPPING_ADDRESS",
        payload: { postalCode: zipcode },
      });
      const estimates = await axios.post("/api/shipping/estimate-shipping", {
        zipcode: zipcode,
      });
      const options = estimates.data.filter((estimate) => {
        return (
          estimate.service_code === "ups_ground" ||
          (estimate.carrier_id === "se-963358" &&
            estimate.package_type === "package" &&
            estimate.service_code !== "usps_media_mail")
        );
      });
      dispatch({
        type: "SAVE_SHIPPING_ESTIMATES",
        payload: options,
      });
    } catch (err) {
      console.log("err from api", err);
      return toast.error("Sorry, there was a problem getting your estimates!");
    }
  };

  function CheckIcon(props) {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
        <path
          d="M7 13l3 3 7-7"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <>
      <h1 className="mb-4 text-xl">
        Shipping Options {shippingEstimates ? <>for {zipcode}</> : <></>}
      </h1>
      <div className="grid md:grid-cols-4 md:gap-5">
        {shippingEstimates ? (
          <div className="md:col-span-3">
            <div className="w-full">
              <div className="">
                <RadioGroup
                  value={selectedShippingOption}
                  onChange={setSelectedShippingMethod}
                >
                  <RadioGroup.Label className="sr-only">
                    Ship to {shippingAddress.postalCode}
                  </RadioGroup.Label>
                  <div className="space-y-4">
                    {shippingEstimates.map((plan, index) => (
                      <RadioGroup.Option
                        key={plan.service_type}
                        value={plan}
                        className={({ active, checked }) =>
                          `
                      ${
                        checked
                          ? "bg-red-500 text-white"
                          : "bg-white hover:bg-red-200"
                      }
                       card relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="flex w-full items-center justify-between">
                              <div className="flex items-center">
                                <div className="text-sm">
                                  <RadioGroup.Label
                                    as="p"
                                    className={`font-medium  ${
                                      checked ? "text-white" : "text-gray-900"
                                    }`}
                                  >
                                    {plan.service_type}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as="span"
                                    className={`inline ${
                                      checked ? "text-sky-100" : "text-gray-500"
                                    }`}
                                  >
                                    <span>
                                      Delivery in {plan.delivery_days} days.
                                    </span>{" "}
                                    <span aria-hidden="true">&middot;</span>{" "}
                                    <span className="text-gray-700">
                                      ${plan.shipping_amount.amount}
                                    </span>
                                  </RadioGroup.Description>
                                </div>
                              </div>
                              {checked && (
                                <div className="shrink-0 text-white">
                                  <CheckIcon className="h-6 w-6" />
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="card md:col-span-1 h-fit flex">
          {/* <div className="my-4 mx-6 text-sm">
            
          </div> */}
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="m-4 " onChange={onChangeHandler}>
              <div className="text-sm mb-4">
                Get shipping options based on your zip code.
              </div>
              <input
                placeHolder="Zip code"
                className=""
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
              <button className="w-full my-4 primary-button estimate-btn">
                Check Options
              </button>
              {errors.zip && (
                <div className="text-red-500 ">{errors.zip.message}</div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
