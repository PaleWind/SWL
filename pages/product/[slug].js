import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import Product from "../../models/Product";
import db from "../../utils/db";
import { Store } from "../../utils/Store";
import { Disclosure } from "@headlessui/react";
//        import {ChevronUpIcon} from '@heroicons/react/20/solid'

export default function ProductScreen(props) {
  const { product } = props;
  const { image: images } = product;
  const [index, setIndex] = useState(0);
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  if (!product) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }
  const setImage = (index) => {
    setIndex(index);
  };
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    //const { data } = await axios.get(`/api/products/${product._id}`);
    // if (data.countInStock < quantity) {
    //   return toast.error('Sorry. Product is out of stock');
    // }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  return (
    <Layout title={product.name}>
      {/* <div className="py-2 text-black">
        <Link href="/">back to products</Link>
      </div> */}
      <div className="p-3"></div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            className="product-detail-image"
            src={images[index]}
            alt={product.name}
            width={600}
            height={600}
            layout="responsive"
          ></Image>
        </div>
        <div className="small-images-container">
          {images ? (
            images.map((image, i) => (
              <div key={i} onMouseEnter={() => setImage(i)}>
                <Image
                  className={
                    i === index
                      ? "small-image selected-small-image"
                      : "small-image"
                  }
                  key={i}
                  src={image}
                  alt={product.name}
                  width={90}
                  height={90}
                ></Image>
              </div>
            ))
          ) : (
            <div>loading...</div>
          )}
        </div>
        <div></div>

        <div>
          <ul>
            <li>
              <h1 className="text-xl text-red-600">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div className="w-full px-4 pt-16">
          <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="shadow flex w-full justify-between rounded-lg bg-white px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-red-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                    <span>What is your refund policy?</span>
                    {/* <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500`}
                    /> */}
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    You already paid, no takesies backsies
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            {/*   <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                 <Disclosure.Button className="shadow flex w-full justify-between rounded-lg bg-white px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-red-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-400 focus-visible:ring-opacity-75">
                    <span>Do you offer technical support?</span>
                     <ChevronUpIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-purple-500`}
                    /> 
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    No.
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>*/}
          </div>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  //console.log(product);
  await db.disconnect();

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
