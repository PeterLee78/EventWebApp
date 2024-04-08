/** @format */
"use client";
import { keepLogin } from "../../../redux/middleware/user";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AuthProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const currPage = usePathname();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    if (user.userId) setIsLoading(false);
    else if (token) dispatch(keepLogin());
    else
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
  }, [currPage, user.userId]);
  return <div>{isLoading ? "" : children}</div>;
}
export default AuthProvider;
