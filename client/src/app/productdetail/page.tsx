import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";

export default function ProductDetail() {
  const product = {
    name: "YOASOBI CONCERT IN YOKOHAMA, JAPAN",
    price: 11000.00,
    description:
      "YOASOBI's debut song ''Into The Night'' released in 2019 topped various streaming charts in Japan and was also ranked on viral charts in several countries. The song topped the Billboard JAPAN Comprehensive Song Chart/Streaming Song Chart in 2020 and surpassed 1 billion streaming plays for the first time in Japan in September 2023.",
    imageUrl: "/images/ys.jpeg",
    inStock: true,
  };
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-8 p-8 bg-gradient-to-l from-[#6f0000] to-[#200122] min-h-screen">
      <div className="w-full lg:w-1/2 h-96 relative">
        <Image
        className="rounded-md" 
        src={product.imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="cover"
      /></div>
      

      <div className="w-full lg:w-1/2 flex flex-col text-white">
        <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
        <div className="mb-3">
          <h2 className="text-2xl font-semibold underline">
            Price: ${product.price.toFixed(2)}
          </h2>
        </div>
        <p className="mb-6">{product.description}</p>
        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Price:</span>
            <span className=" font-semibold">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Status:</span>
            <span
              className={`font-semibold ${
                product.inStock ? "text-[#24FE41]" : "text-red-600"
              }`}
            >
              {product.inStock ? "Available" : "Not Available"}
            </span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <label htmlFor="qty" className="font-semibold">
            Amount
            </label>
            <input
              type="number"
              id="qty"
              name="qty"
              min="1"
              defaultValue="1"
              className="border border-gray-300 rounded text-gray-700 p-2 focus:outline-none"
            />
          </div>
          <button className="bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
