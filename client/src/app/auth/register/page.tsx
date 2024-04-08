"use client";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
const { z } = require("zod");

export default function Page() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const emailSchema = z.string().email();
  const passwordSchema = z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" });

  const handleRegister = (e) => {
    e.preventDefault();
    try {
      emailSchema.parse(email);
      console.log("Email is valid");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Email Error",
        text: "please insert a valid email",
      });
    }
    try {
      // Validate email against the schema
      passwordSchema.parse(password);
      console.log("password is valid");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Password Error",
        text: "Password must be at least 8 characters long",
      });
    }
    if (password != retypePassword) {
      Swal.fire({
        icon: "error",
        title: "password error",
        text: "Your password does not match",
      });
    }
    axios
      .post("http://localhost:8000/api/users/register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        referralCode: referralCode,
      })
      .then(function (response) {
        console.log(response);
        Swal.fire({
          title: "Good job!",
          text: `Welcome ${firstName} ${lastName}`,
          icon: "success",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div
        className=" bg-cover bg-no-repeat bg-center z-0"
        style={{ backgroundImage: "url('/images/bg1.jpg')" }}
      >
        <div className="flex flex-col justify-center items-center min-h-screen text-sm p-3">
          <div className="flex flex-col max-[440px] p-5 rounded-xl bg-black bg-opacity-70">
            <h1 className=" text-3xl font-semibold text-white">
              Create a new account
            </h1>
            <p className="  text-[#989898] text-[13px]">
              By registering, you can make payments and book the ticket booking
              you want
            </p>

            <div className=" font-bold mt-5 text-white">First Name</div>
            <input
              className=" p-3 bg-[#F3F4F6] rounded-lg "
              placeholder="First name"
              // onChange={(e) => formik.setFieldValue("first_name", e.target.value)}
              onChange={(e) => setFirstName(e.target.value)}
              id="first_name"
              // value={formik.values.first_name}
            ></input>
            {/* <div className=" my-1 text-red-500">{formik.errors.first_name}</div> */}

            <div className=" font-bold mt-5 text-white">Last Name</div>
            <input
              className=" p-3 bg-[#F3F4F6] rounded-lg "
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
              // onChange={(e) => formik.setFieldValue("last_name", e.target.value)}
              id="last_name"
              // value={formik.values.last_name}
            ></input>
            {/* <div className=" my-1 text-red-500">{formik.errors.last_name}</div> */}

            <div className=" font-bold mt-5 text-white">Email</div>
            <input
              type="email"
              className="p-3  bg-[#F3F4F6] rounded-lg "
              placeholder="ticketing@mail.com"
              onChange={(e) => setEmail(e.target.value)}
              // onChange={formik.handleChange}
              id="email"
              // value={formik.values.email}
            ></input>
            {/* <div className=" my-1 text-red-500">{formik.errors.email}</div> */}

            <div className=" font-bold mt-5 text-white">Password</div>
            <input
              type="password"
              className="p-3 bg-[#F3F4F6] rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
              // onChange={formik.handleChange}
              id="password"
              // value={formik.values.password}
            ></input>
            {/* <div className=" my-1 text-red-500">{formik.errors.password}</div> */}

            <div className=" font-bold mt-5 text-white">Re-Type Password</div>
            <input
              type="password"
              className="p-3 bg-[#F3F4F6] rounded-lg"
              onChange={(e) => setRetypePassword(e.target.value)}
              // onChange={formik.handleChange}
              id="password"
              // value={formik.values.password}
            ></input>
            {/* <div className=" my-1 text-red-500">{formik.errors.password}</div> */}

            <div className=" font-bold mt-5 text-white">Referral Code</div>
            <input
              className="p-3 bg-[#F3F4F6] rounded-lg"
              onChange={(e) => setReferralCode(e.target.value)}
              // onChange={formik.handleChange}
              id="referralcode"
              // value={formik.values.password}
            ></input>
            <p className=" mt-5 text-[#989898] text-[13px]">
              By registering, you agree to the Terms of Service and Privacy
              Policy of Ticketing.com
            </p>
            <div className=" mt-4 text-xs text-white">
              Already have an account?{" "}
              <Link href="/auth/login" className=" text-[#FF0000] font-bold">
                Login
              </Link>
            </div>
            <button
              className="rounded-lg mt-2 text-white bg-[#FF0000] h-16 font-semibold text-lg hover:underline hover:bg-[#690003]"
              // onClick={formik.handleSubmit}
              onClick={handleRegister}
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
