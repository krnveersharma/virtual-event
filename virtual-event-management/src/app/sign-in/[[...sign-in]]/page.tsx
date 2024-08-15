"use client";
import {
  FaCheckCircle,
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const commonStyles = {
  inputIcon:
    "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",
  input:
    "block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600",
  button:
    "inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80",
  socialButton:
    "relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none",
  link: "font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline",
};

const TheBusiness = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const handleSubmit=async(e:any)=>{
    e.preventDefault();
    const res = await fetch("http://localhost:5000/user/signIn", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    if(response.status===400){
      toast.error(response.message)
    }
    else{
      toast.success(response.message)
    }
  }
  return (
    <section className="bg-white">
      <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
        <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            Sign in
          </h2>
          <p className="mt-2 text-base text-gray-600">
              Don't have an account?{" "}
              <Link href="/sign-up" className={commonStyles.link}>
                Sign up
              </Link>
            </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="text-base font-medium text-gray-900">
                username
              </label>
              <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                <div className={commonStyles.inputIcon}>
                  <FaUser className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className={commonStyles.input}
                  value={data.username}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>

            <div>
              <label className="text-base font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                <div className={commonStyles.inputIcon}>
                  <FaLock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className={commonStyles.input}
                  value={data.password}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>

            <div>
              <button type="submit" className={commonStyles.button}>
                Sign up
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default TheBusiness;
