"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import axios from "axios";
const EventDetail = () => {
  const params = useParams();
  const [event, setEvent] = useState({});
  const [subtotal, setSubtotal] = useState(0);

  function handleAmount(e) {
    e.preventDefault();
    const amount = e.target.value;
    setSubtotal(Number(amount) * event.price);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/events/${params.eventId}`)
      .then((response) => {
        // Handle successful response
        setEvent(response.data);
        setSubtotal(response.data.price);
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-center gap-8 p-8 bg-gradient-to-l from-[#6f0000] to-[#200122] min-h-screen">
      <div className="w-full lg:w-1/2 h-96 relative">
        <Image
          className="rounded-md"
          src={`/uploads/${event.image}`}
          alt="Yoasobi"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col text-white">
        <h1 className="text-3xl font-bold mb-3">{event.eventName}</h1>
        <div className="mb-3">
          <h2 className="text-2xl font-semibold underline">
            Price: IDR{event.price}
          </h2>
        </div>
        <p className="mb-6">{event.description}</p>
        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Price:</span>
            <span className=" font-semibold">${event.price}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Status:</span>
            <span
              className={`font-semibold ${
                event.availableTickets ? "text-[#24FE41]" : "text-red-600"
              }`}
            >
              {event.availableTickets ? "Available" : "Not Available"}
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
              onChange={handleAmount}
              className="border border-gray-300 rounded text-gray-700 p-2 focus:outline-none"
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Subtotal:</span>
            <span className=" font-semibold">IDR. {subtotal}</span>
          </div>
          <button className="bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors">
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
