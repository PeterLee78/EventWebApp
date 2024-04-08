"use client";
import { functionLogin, functionLogout } from "../slices/userSlice";

export const keepLogin = () => {
  return async (dispatch) => {
    try {
      //   const res = await axios.get("/api/users/login", {
      //     headers: {
      //       Authorization: token,
      //     },
      //   });

      //   console.log(res.data);
      const token = localStorage.getItem("token");

      const decoded = JSON.parse(atob(token.split(".")[1]));

      if (decoded.userId) {
        dispatch(functionLogin(decoded));

        localStorage.setItem("token", token);
      } else {
        alert("user not found");
        throw Error("user not found");
      }
      return;
    } catch (err) {
      localStorage.removeItem("token");
      dispatch(functionLogout);
      return err.message;
    }
  };
};
