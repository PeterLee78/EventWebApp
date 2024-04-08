"use client";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
// import 'jwt' from 'jsonwebtoken'
import { functionLogin } from "@/../redux/slices/userSlice";
import { redirect } from "next/navigation";

export default function Page() {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/users/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(true);
        const token = response.data.token;
        localStorage.setItem("token", token);
        const localToken = localStorage.getItem("token");
        const decoded = JSON.parse(atob(localToken.split(".")[1]));
        console.log("Decoded Token:", decoded);
        dispatch(functionLogin(decoded));

        // redirect("/");

        // console.log(document.cookie);
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Please try again",
          text: "Wrong Email or Password",
        });
        console.log(false);
      });
  };

  return (
    <>
      <div
        className=" bg-cover bg-no-repeat bg-center z-0"
        style={{ backgroundImage: "url('/images/bg.png')" }}
      >
        <div className="flex flex-col justify-center items-center min-h-screen text-sm p-3">
          <div className=" text-center pb-9">
            <h1 className="font-extrabold text-white text-[45px] pb-4">
              Welcome to ticketing.com
              {/* {user?.userId} */}
            </h1>
            <p className=" text-white text-xl font-semibold underline tracking-wide">
              The safest and most trusted music event ticket sales site
            </p>
          </div>
          <div className="flex flex-col max-[440px] p-5 rounded-xl bg-black bg-opacity-70">
            <h1 className=" text-3xl font-semibold text-white">
              Enter your account
            </h1>
            <p className="text-[#989898] text-[13px]">
              To be able to book tickets and make payments you must first login
            </p>

            <div className=" font-bold mt-5 text-white">Email</div>
            <input
              type="email"
              placeholder="ticketing@mail.com"
              className="p-3 bg-[#F3F4F6] rounded-lg"
              onChange={handleEmail}
            />

            <div className=" font-bold mt-5 text-white">Password</div>
            <div className="p-3 flex bg-[#F3F4F6] rounded-lg w-full">
              <input
                type={isPasswordShown ? "text" : "password"}
                id="password"
                className="w-full  bg-[#F3F4F6] outline-none"
                onChange={handlePassword}
              />
              <button
                onClick={togglePasswordVisibility}
                type="button"
                className="ml-2"
              >
                {isPasswordShown ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="mt-4 text-xs text-white">
              Dont have an account?{" "}
              <Link href="/auth/register" className=" text-[#FF0000] font-bold">
                Register
              </Link>
            </div>
            <button
              className="rounded-lg mt-2 text-white bg-[#FF0000] h-16 font-semibold text-md hover:underline hover:bg-[#690003]"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
