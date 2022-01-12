import React, { useState } from "react";
import nookies from "nookies";

export async function getServerSideProps(ctx) {
  //access cookies
  const cookies = nookies.get(ctx);
  if (cookies.token) {
    //redirect to dashboard page
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }
  return {
    props: {},
  };
}

export default function RegisterPage() {
  const [field, setField] = useState({});
  const [progress, setProgress] = useState(false);
  const [success, setSuccess] = useState(false);

  function setValue(e) {
    const target = e.target;

    const name = target.name;
    const value = target.value;

    setField({
      ...field,
      [name]: value,
    });
  }

  async function doRegister(e) {
    e.preventDefault();
    setProgress(true);
    const req = await fetch(`${process.env.NEXT_PUBLIC_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(field),
    });
    const res = await req.json();

    if (res.result === "success") {
      setField({});
      setSuccess(true);
      e.target.reset();
    }
    setProgress(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">Your Logo</h1>
        {success && (
          <div className="bg-green-500 text-white rounded mb-4 px-3 py-2">
            Your account have been registered
          </div>
        )}

        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form onSubmit={doRegister} className="px-5 py-7" relative>
            {progress && <div className="absolute inset-0 z-10 bg-white/50" />}

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Username
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
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Confirm Password
            </label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              name="password_confirmation"
              onChange={setValue}
            />
            <button
              disabled={progress}
              type="submit"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">Register</span>
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
