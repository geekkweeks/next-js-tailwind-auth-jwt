import React, { useState } from "react";
import nookies from "nookies";
import Router from "next/router";

export default function LoginPage() {
  const [field, setField] = useState({});
  const [progress, setProgress] = useState(false);
  const [isError, setIsError] = useState(false);

  function setValue(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setField({
      ...field,
      [name]: value,
    });
  }

  async function doLogin(e) {
    e.preventDefault();
    setProgress(true);
    const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(field),
    });

    const res = await req.json();
    if (res.token) {
      setIsError(false);
      console.log(res.token);
      nookies.set(null, "token", res.token);
      Router.replace('/dashboard')

    } else {
      setIsError(true);
    }
    setProgress(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">Your Logo</h1>
        {isError && (
          <div className="bg-red-500 text-white rounded mb-4 px-3 py-2">
            Invalid Username or Password
          </div>
        )}
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form onSubmit={doLogin} className="px-5 py-7">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              username
            </label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              name="username"
              onChange={setValue}
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Password
            </label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              name="password"
              onChange={setValue}
            />
            <button
              type="submit"
              disabled={progress}
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">Login</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
