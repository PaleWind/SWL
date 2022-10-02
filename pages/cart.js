import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/outline";
import Layout from "../components/Layout";
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../utils/error";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Cookies from "js-cookie";
import EstimateShipping from "../components/EstimateShipping";

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems, shippingCost },
  } = state;

  const style = { layout: "vertical", color: "black" };

  useEffect(() => {
    const loadPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/keys/paypal");
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": clientId,
          currency: "USD",
        },
      });
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    };
    loadPaypalScript();
  }, [paypalDispatch]);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46
  const shippingPrice = shippingCost ? 0 : 0;
  const taxPrice = round2(itemsPrice * 0.06);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    toast.success("Product updated in the cart");
  };

  function createOrder(data, actions) {
    console.log("data", data);
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        console.log("details", details);
        const fullName = details.purchase_units[0].shipping.name.full_name;
        const email = details.payer.email_address;
        const line1 = details.purchase_units[0].shipping.address.address_line_1;
        const city = details.purchase_units[0].shipping.address.admin_area_2;
        const postalCode =
          details.purchase_units[0].shipping.address.postal_code;
        const country = "USA";
        const address = { fullName, email, line1, city, postalCode, country };
        dispatch({
          type: "SAVE_SHIPPING_ADDRESS",
          payload: { fullName, email, line1, city, postalCode, country },
        });
        const { data } = await axios.post("/api/orders", {
          orderItems: cartItems,
          shippingAddress: address,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        });

        const { payment } = await axios.put(
          `/api/orders/${data._id}/pay`,
          details
        );
        toast.success("Payment successful");
        dispatch({ type: "CART_CLEAR_ITEMS" });
        Cookies.set(
          "cart",
          JSON.stringify({
            ...state,
            cartItems: [],
          })
        );
        router.push(`/order/${data._id}`);

        const res = await axios.post("/api/email/sendReceipt", {
          orderID: data._id,
          orderItems: cartItems,
          shippingAddress: address,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        });

        // const { error } = await res.json();
        // if (error) {
        //   console.log(error);
        //   return;
        // }
      } catch (err) {
        console.log(err);
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }
  function onError(err) {
    toast.error(getError(err));
    console.log(err);
  }

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty.{" "}
          <Link href="/">
            <a className="text-red-600 hover:underline hover:text-gray-500">
              Back to Home
            </a>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <table className="min-w-full ">
                <thead className="border-b">
                  <tr>
                    <th className="p-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr
                      key={item.slug}
                      className="border-b hover:bg-gray-100 transition-all"
                    >
                      <td>
                        <Link href={`/product/${item.slug}`}>
                          <a className="flex items-center text-black">
                            <Image
                              src={item.image[0] ?? ""}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                            &nbsp;
                            {item.name}
                          </a>
                        </Link>
                      </td>
                      <td className="p-5 text-right">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-5 text-right">${item.price}</td>
                      <td className="p-5 text-center">
                        <button onClick={() => removeItemHandler(item)}>
                          <XCircleIcon className="h-5 w-5"></XCircleIcon>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card p-5">
              <ul>
                {/* <li>
                <div className="pb-3 text-xl">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li> */}
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>${itemsPrice.toFixed(2)}</div>
                  </div>
                </li>{" "}
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tax</div>
                    <div>${taxPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Shipping</div>
                    <div>
                      ${shippingCost > 0 ? shippingCost.toFixed(2) : "--"}
                    </div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>${totalPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li className=" w-full">
                  {/* <button
                  onClick={() => router.push('/shipping')}
                  className="primary-button w-full"
                >
                  Check Out
                </button> */}
                  {isPending ? (
                    <div>Loading...</div>
                  ) : (
                    <PayPalButtons
                      style={style}
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <EstimateShipping></EstimateShipping>
        </>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
