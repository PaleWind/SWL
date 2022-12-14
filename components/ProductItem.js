/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card product-card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image[0]}
            alt={product.name}
            className="rounded shadow object-cover h-64 w-full"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg text-red-600 hover:text-gray-500 hover:underline transition-all">
              {product.name}
            </h2>
          </a>
        </Link>
        <p>${product.price}</p>
        <button
          className="primary-button transition-all"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
