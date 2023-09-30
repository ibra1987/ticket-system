import React from "react";
import Login from "./components/Login";

function page() {
  return (
    <div className="w-full flex flex-col justify-center items-center p-4">
      <h1 className="w-full text-2xl text-center m-4 font-extrabold text-gray-600">
        Login to your account
      </h1>
      <Login />
    </div>
  );
}

export default page;
