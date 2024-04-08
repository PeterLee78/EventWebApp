import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

type Transaction = {
  date: string;
  time: string;
  eventName: string;
  ticketQty: number;
  totalPrice: number;
};

const transactions: Transaction[] = [
  {
    date: "11 Mar 2021",
    time: "12:18",
    eventName: "Taylor Swift",
    ticketQty: 4,
    totalPrice: 3600000,
  },
  {
    date: "28 Jan 2021",
    time: "14:56",
    eventName: "Yoasobi",
    ticketQty: 2,
    totalPrice: 2400000,
  },
  {
    date: "18 Nov 2020",
    time: "13:29",
    eventName: "Taylor Swift",
    ticketQty: 2,
    totalPrice: 1800000,
  },
];

export default function TransactionHistory() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-l from-[#6f0000] to-[#200122] p-5">
        <div className="container mx-auto">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-5">Transaction History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="w-full h-16 border-gray-300 border-b py-8">
                    <th className="text-left pl-14">Time & Date</th>
                    <th className="text-left">Event Name</th>
                    <th className="text-center">Ticket Qty</th>
                    <th className="text-right pr-14">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(
                    (
                      { date, time, eventName, ticketQty, totalPrice },
                      index
                    ) => (
                      <tr key={index} className="h-14 border-gray-300 border-b">
                        <td className="text-left pl-14">{`${date} ${time}`}</td>
                        <td className="text-left">{eventName}</td>
                        <td className="text-center">{ticketQty}</td>
                        <td className="text-right pr-14">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(totalPrice)}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
